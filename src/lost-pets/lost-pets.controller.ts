import { Body, Controller, Post, Get, Query } from "@nestjs/common";
import { CreateLostPetDto } from "./dto/create-lost-pet.dto";
import { LostPetsService } from "./lost-pets.service";

@Controller("lost-pets")
export class LostPetsController {
    constructor(private readonly lostPetsService: LostPetsService) {}

    @Post()
    async create(@Body() dto: CreateLostPetDto) {
        return await this.lostPetsService.create(dto);
    }

   
    @Get("nearby")
    findNearby(
        @Query("lat") lat: number,
        @Query("lng") lng: number,
        @Query("distance") distance: number,
    ) {
        return this.lostPetsService.findNearby(lat, lng, distance);
    }
}