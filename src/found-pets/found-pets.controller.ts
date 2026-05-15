import { Body, Controller, Post, Get, UseInterceptors, } from "@nestjs/common";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { CreateFoundPetDto } from "./dto/create-found-pet.dto";
import { FoundPetsService } from "./found-pets.service";

@Controller("found-pets")
@UseInterceptors(CacheInterceptor)
export class FoundPetsController {
    constructor(private readonly foundPetsService: FoundPetsService) {}

    @Post()
    async create(@Body() dto: CreateFoundPetDto) {
        return await this.foundPetsService.create(dto);
    }

    
    @Get()
    async findAll() {
        return await this.foundPetsService.findAll();
    }
}