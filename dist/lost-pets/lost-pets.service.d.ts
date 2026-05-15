import { LostPet } from "src/core/db/entities/lost-pet.entity";
import { Repository } from "typeorm";
import { CreateLostPetDto } from "./dto/create-lost-pet.dto";
import { EmailService } from "src/email/email.service";
export declare class LostPetsService {
    private readonly lostPetRepo;
    private readonly emailService;
    constructor(lostPetRepo: Repository<LostPet>, emailService: EmailService);
    findNearby(lat: number, lng: number, distance?: number): Promise<any>;
    create(dto: CreateLostPetDto): Promise<LostPet>;
}
