import { IncidentCDto } from 'src/core/interfaces/incident.interface';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { Incident } from 'src/core/db/entities/incident.entity';
export declare class IncidentsService {
    private readonly incidentRepository;
    private readonly emailService;
    constructor(incidentRepository: Repository<Incident>, emailService: EmailService);
    createIncident(incident: IncidentCDto): Promise<Boolean>;
}
