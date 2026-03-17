import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { envs } from "src/config/envs";
import { FoundPet } from "src/core/db/entities/found-pet.entity";
import { EmailService } from "src/email/email.service";
import { Repository } from "typeorm";
import { CreateFoundPetDto } from "./dto/create-found-pet.dto";
import { generateFoundMatchEmailTemplate, type LostPetMatch } from "./templates/found-match-email.template";

@Injectable()
export class FoundPetsService {
    constructor(
        @InjectRepository(FoundPet)
        private readonly foundPetRepo: Repository<FoundPet>,
        private readonly emailService: EmailService,
    ) {}

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

        // Core requirement: search lost pets within 500m using ST_DWithin and ::geography (meters)
        const matches = (await this.foundPetRepo.query(
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
        )) as LostPetMatch[];

        const mailTo = (envs.MAIL_TO && envs.MAIL_TO.trim().length > 0 ? envs.MAIL_TO : envs.MAILER_EMAIL).trim();

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
                subject: `PetRadar: mascota encontrada cerca de ${lost.name} (${Math.round(lost.distance)}m)`,
                html,
            });

            if (ok) notified += 1;
        }

        return { found: saved, matches_notified: notified };
    }
}

