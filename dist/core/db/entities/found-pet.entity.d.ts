import type { Point } from "typeorm";
export declare class FoundPet {
    id: number;
    species: string;
    breed: string | null;
    color: string;
    size: string;
    description: string;
    photo_url: string | null;
    finder_name: string;
    finder_email: string;
    finder_phone: string;
    location: Point;
    address: string;
    found_date: Date;
    created_at: Date;
    updated_at: Date;
}
