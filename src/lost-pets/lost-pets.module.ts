import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LostPet } from "src/core/db/entities/lost-pet.entity";
import { LostPetsController } from "./lost-pets.controller";
import { LostPetsService } from "./lost-pets.service";
import { EmailModule } from "src/email/email.module"; 

@Module({
    imports: [
        TypeOrmModule.forFeature([LostPet]),
        EmailModule, // 👈 ADD THIS
    ],
    controllers: [LostPetsController],
    providers: [LostPetsService],
})
export class LostPetsModule {}