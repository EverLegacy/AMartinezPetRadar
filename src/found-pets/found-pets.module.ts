import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoundPet } from "src/core/db/entities/found-pet.entity";
import { EmailModule } from "src/email/email.module";
import { FoundPetsController } from "./found-pets.controller";
import { FoundPetsService } from "./found-pets.service";

@Module({
    imports: [EmailModule, TypeOrmModule.forFeature([FoundPet])],
    controllers: [FoundPetsController],
    providers: [FoundPetsService],
})
export class FoundPetsModule {}

