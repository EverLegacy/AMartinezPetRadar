import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { envs } from "src/config/envs";
import { FoundPet } from "src/core/db/entities/found-pet.entity";
import { LostPet } from "src/core/db/entities/lost-pet.entity";

import { EmailService } from "src/email/email.service";
import { CreateFoundPetDto } from "./dto/create-found-pet.dto";

import { generateFoundMatchEmailTemplate } from "./templates/found-match-email.template";

@Injectable()
export class FoundPetsService {
    constructor(
        @InjectRepository(FoundPet)
        private readonly foundPetRepo: Repository<FoundPet>,

        @InjectRepository(LostPet)
        private readonly lostPetRepo: Repository<LostPet>,

        private readonly emailService: EmailService,
    ) {}

    async findAll(): Promise<FoundPet[]> {
        return this.foundPetRepo.find({
            order: {
                found_date: "DESC",
            },
        });
    }

    async create(dto: CreateFoundPetDto): Promise<{
        found: FoundPet;
        matches_notified: number;
    }> {
        const found = this.foundPetRepo.create({
            species: dto.species,
            breed: dto.breed ?? null,
            color: dto.color,
            size: dto.size,
            description: dto.description,
            photo_url: dto.photo_url ?? null,

            finder_name: dto.finder_name,
            finder_email: dto.finder_email,
            finder_phone: dto.finder_phone,

            address: dto.address,
            found_date: new Date(dto.found_date),

            location: {
                type: "Point",
                coordinates: [dto.lng, dto.lat],
            },
        });

        const saved = await this.foundPetRepo.save(found);

        const matches = (await this.lostPetRepo.query(
            `
            SELECT
                lp.*,

                ST_Distance(
                    lp.location::geography,
                    ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
                ) AS distance,

                ST_Y(lp.location) AS lost_lat,
                ST_X(lp.location) AS lost_lng

            FROM lost_pets lp
            WHERE lp.is_active = true
            AND ST_DWithin(
                lp.location::geography,
                ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
                500
            )
            ORDER BY distance ASC
            `,
            [dto.lng, dto.lat],
        )) as any[];

        const mailTo =
            envs.MAIL_TO?.trim().length
                ? envs.MAIL_TO
                : envs.MAILER_EMAIL;

        let notified = 0;

        for (const lost of matches) {
            const html = generateFoundMatchEmailTemplate({
                found: {
                    species: saved.species,
                    breed: saved.breed,
                    color: saved.color,
                    size: saved.size,
                    description: saved.description,
                    photo_url: saved.photo_url,
                    finder_name: saved.finder_name,
                    finder_email: saved.finder_email,
                    finder_phone: saved.finder_phone,
                    address: saved.address,
                    found_date: saved.found_date,
                    found_lat: dto.lat,
                    found_lng: dto.lng,
                },
                lost,
            });

            const ok = await this.emailService.sendEmail({
                to: mailTo,
                subject: `PetRadar: posible coincidencia (${Math.round(
                    lost.distance,
                )}m)`,
                html,
            });

            if (ok) notified++;
        }

        return {
            found: saved,
            matches_notified: notified,
        };
    }
}