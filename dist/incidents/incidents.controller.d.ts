import { IncidentsService } from './incidents.service';
import type { IncidentCDto } from 'src/core/interfaces/incident.interface';
export declare class IncidentsController {
    private readonly incidentService;
    constructor(incidentService: IncidentsService);
    createIncident(incident: IncidentCDto): Promise<Boolean>;
}
