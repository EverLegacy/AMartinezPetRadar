import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LostPet } from "src/core/db/entities/lost-pet.entity";
import { Repository } from "typeorm";
import { CreateLostPetDto } from "./dto/create-lost-pet.dto";
import { EmailService } from "src/email/email.service";


@Injectable()
export class LostPetsService {
    constructor(
    @InjectRepository(LostPet)
    private readonly lostPetRepo: Repository<LostPet>,
    private readonly emailService: EmailService, 
) {}
    async findNearby(lat: number, lng: number, distance: number = 5000) {
    return this.lostPetRepo.query(`
        SELECT *
        FROM lost_pets
        WHERE ST_DWithin(
            location,
            ST_SetSRID(ST_MakePoint($1, $2), 4326),
            $3
        )
    `, [lng, lat, distance]);
}

    async create(dto: CreateLostPetDto): Promise<LostPet> {
    const entity = this.lostPetRepo.create({
        name: dto.name,
        species: dto.species,
        breed: dto.breed,
        color: dto.color,
        size: dto.size,
        description: dto.description,
        photo_url: dto.photo_url ?? null,
        owner_name: dto.owner_name,
        owner_email: dto.owner_email,
        owner_phone: dto.owner_phone,
        address: dto.address,
        lost_date: new Date(dto.lost_date),
        is_active: dto.is_active ?? true,
        location: {
            type: "Point",
            coordinates: [dto.lng, dto.lat],
        },
    });

    const saved = await this.lostPetRepo.save(entity);


    await this.emailService.sendEmail({
        to: saved.owner_email,
        subject: "Mascota reportada",
        html: `<h2>Hola ${saved.owner_name}</h2>
               <p>Tu reporte de <b>${saved.name}</b> fue creado correctamente.</p>`
    });

    return saved;
}
}

