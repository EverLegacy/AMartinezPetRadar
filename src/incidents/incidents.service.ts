import { Injectable } from '@nestjs/common';
import { IncidentCDto } from 'src/core/interfaces/incident.interface';
import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
import { EmailService } from 'src/email/email.service';
import { generateIncidentEmailTemplate } from './templates/incident-email.template';
import { Repository } from 'typeorm';
import { Incident } from 'src/core/db/entities/incident.entity';
import { InjectRepository } from '@nestjs/typeorm';
// npm run start:dev
//Repositorio --> Patron de Diseño Repository
@Injectable()
export class IncidentsService {
    constructor(
        @InjectRepository(Incident)
        private readonly incidentRepository : Repository<Incident>,
        private readonly emailService : EmailService
    ){}

    async createIncident(incident:IncidentCDto) : Promise<Boolean>{
        // UNA ENTIDAD DE INICIDENTE
        // GUARDAS EN DB
        const newIncident = this.incidentRepository.create({
            title: incident.title,
            description: incident.description,
            type: incident.type,
            location:{
                type: 'Point',
                coordinates:[incident.lon, incident.lat]
            }
        });
        await this.incidentRepository.save(newIncident);
        const template = generateIncidentEmailTemplate(incident);
        const options : EmailOptions = {
            to: "devjdfr@gmail.com",
            subject: incident.title,
            html: template
        }
        const result = await this.emailService.sendEmail(options);
        return result;
    }
}
