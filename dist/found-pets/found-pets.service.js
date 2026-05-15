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
exports.FoundPetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const envs_1 = require("../config/envs");
const found_pet_entity_1 = require("../core/db/entities/found-pet.entity");
const email_service_1 = require("../email/email.service");
const typeorm_2 = require("typeorm");
const found_match_email_template_1 = require("./templates/found-match-email.template");
let FoundPetsService = class FoundPetsService {
    foundPetRepo;
    emailService;
    constructor(foundPetRepo, emailService) {
        this.foundPetRepo = foundPetRepo;
        this.emailService = emailService;
    }
    async create(dto) {
        const found = this.foundPetRepo.create({
            species: dto.species,
            breed: dto.breed ?? null,
            color: dto.color,
            size: dto.size,
            description: dto.description,
            photo_url: dto.photo_url ?? null,
            finder_name: dto.finder_name,
            finder_email: dto.finder_email,
            finder_phone: dto.finder_phone,
            address: dto.address,
            found_date: new Date(dto.found_date),
            location: {
                type: "Point",
                coordinates: [dto.lng, dto.lat],
            },
        });
        const saved = await this.foundPetRepo.save(found);
        const matches = (await this.foundPetRepo.query(`
            SELECT
              lp.*,
              ST_Distance(
                lp.location::geography,
                ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
              ) AS distance,
              ST_Y(lp.location) AS lost_lat,
              ST_X(lp.location) AS lost_lng
            FROM lost_pets lp
            WHERE lp.is_active = true
              AND ST_DWithin(
                lp.location::geography,
                ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
                500
              )
            ORDER BY distance ASC
            `, [dto.lng, dto.lat]));
        const mailTo = (envs_1.envs.MAIL_TO && envs_1.envs.MAIL_TO.trim().length > 0 ? envs_1.envs.MAIL_TO : envs_1.envs.MAILER_EMAIL).trim();
        let notified = 0;
        for (const lost of matches) {
            const html = (0, found_match_email_template_1.generateFoundMatchEmailTemplate)({
                found: {
                    species: saved.species,
                    breed: saved.breed,
                    color: saved.color,
                    size: saved.size,
                    description: saved.description,
                    photo_url: saved.photo_url,
                    finder_name: saved.finder_name,
                    finder_email: saved.finder_email,
                    finder_phone: saved.finder_phone,
                    address: saved.address,
                    found_date: saved.found_date,
                    found_lat: dto.lat,
                    found_lng: dto.lng,
                },
                lost,
            });
            const ok = await this.emailService.sendEmail({
                to: mailTo,
                subject: `PetRadar: mascota encontrada cerca de ${lost.name} (${Math.round(lost.distance)}m)`,
                html,
            });
            if (ok)
                notified += 1;
        }
        return { found: saved, matches_notified: notified };
    }
};
exports.FoundPetsService = FoundPetsService;
exports.FoundPetsService = FoundPetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(found_pet_entity_1.FoundPet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], FoundPetsService);
//# sourceMappingURL=found-pets.service.js.map