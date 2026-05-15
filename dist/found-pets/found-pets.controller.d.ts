import { CreateFoundPetDto } from "./dto/create-found-pet.dto";
import { FoundPetsService } from "./found-pets.service";
export declare class FoundPetsController {
    private readonly foundPetsService;
    constructor(foundPetsService: FoundPetsService);
    create(dto: CreateFoundPetDto): Promise<{
        found: import("../core/db/entities/found-pet.entity").FoundPet;
        matches_notified: number;
    }>;
}
