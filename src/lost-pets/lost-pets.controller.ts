import { Body, Controller, Post, Get, Query, UseInterceptors,} from "@nestjs/common";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { CreateLostPetDto } from "./dto/create-lost-pet.dto";
import { LostPetsService } from "./lost-pets.service";

@Controller("lost-pets")
@UseInterceptors(CacheInterceptor)
export class LostPetsController {
    constructor(private readonly lostPetsService: LostPetsService) {}

    @Post()
    async create(@Body() dto: CreateLostPetDto) {
        return await this.lostPetsService.create(dto);
    }

    // REQUIRED ENDPOINT
    @Get()
    async findAllActive() {
        return await this.lostPetsService.findAllActive();
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