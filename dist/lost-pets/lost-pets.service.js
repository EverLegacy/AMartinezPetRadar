"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostPetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lost_pet_entity_1 = require("../core/db/entities/lost-pet.entity");
const typeorm_2 = require("typeorm");
const email_service_1 = require("../email/email.service");
let LostPetsService = class LostPetsService {
    lostPetRepo;
    emailService;
    constructor(lostPetRepo, emailService) {
        this.lostPetRepo = lostPetRepo;
        this.emailService = emailService;
    }
    async findNearby(lat, lng, distance = 5000) {
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
    async create(dto) {
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
};
exports.LostPetsService = LostPetsService;
exports.LostPetsService = LostPetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lost_pet_entity_1.LostPet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], LostPetsService);
//# sourceMappingURL=lost-pets.service.js.map