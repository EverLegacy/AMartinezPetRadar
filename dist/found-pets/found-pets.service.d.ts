import { FoundPet } from "src/core/db/entities/found-pet.entity";
import { EmailService } from "src/email/email.service";
import { Repository } from "typeorm";
import { CreateFoundPetDto } from "./dto/create-found-pet.dto";
export declare class FoundPetsService {
    private readonly foundPetRepo;
    private readonly emailService;
    constructor(foundPetRepo: Repository<FoundPet>, emailService: EmailService);
    create(dto: CreateFoundPetDto): Promise<{
        found: FoundPet;
        matches_notified: number;
    }>;
}
