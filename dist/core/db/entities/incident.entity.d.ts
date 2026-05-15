import { IncidentType } from "src/core/enums/incident-type.enum";
import type { Point } from 'typeorm';
export declare class Incident {
    id: number;
    title: string;
    description: string;
    location: Point;
    type: IncidentType;
}
