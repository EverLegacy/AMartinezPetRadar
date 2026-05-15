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
exports.IncidentsService = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("../email/email.service");
const incident_email_template_1 = require("./templates/incident-email.template");
const typeorm_1 = require("typeorm");
const incident_entity_1 = require("../core/db/entities/incident.entity");
const typeorm_2 = require("@nestjs/typeorm");
let IncidentsService = class IncidentsService {
    incidentRepository;
    emailService;
    constructor(incidentRepository, emailService) {
        this.incidentRepository = incidentRepository;
        this.emailService = emailService;
    }
    async createIncident(incident) {
        const newIncident = this.incidentRepository.create({
            title: incident.title,
            description: incident.description,
            type: incident.type,
            location: {
                type: 'Point',
                coordinates: [incident.lon, incident.lat]
            }
        });
        await this.incidentRepository.save(newIncident);
        const template = (0, incident_email_template_1.generateIncidentEmailTemplate)(incident);
        const options = {
            to: "devjdfr@gmail.com",
            subject: incident.title,
            html: template
        };
        const result = await this.emailService.sendEmail(options);
        return result;
    }
};
exports.IncidentsService = IncidentsService;
exports.IncidentsService = IncidentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(incident_entity_1.Incident)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        email_service_1.EmailService])
], IncidentsService);
//# sourceMappingURL=incidents.service.js.map