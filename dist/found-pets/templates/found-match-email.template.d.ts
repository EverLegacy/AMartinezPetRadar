export type LostPetMatch = {
    id: number;
    name: string;
    species: string;
    breed: string;
    color: string;
    size: string;
    description: string;
    photo_url: string | null;
    owner_name: string;
    owner_email: string;
    owner_phone: string;
    address: string;
    lost_date: string | Date;
    distance: number;
    lost_lat: number;
    lost_lng: number;
};
export type FoundPetForEmail = {
    species: string;
    breed: string | null;
    color: string;
    size: string;
    description: string;
    photo_url: string | null;
    finder_name: string;
    finder_email: string;
    finder_phone: string;
    address: string;
    found_date: string | Date;
    found_lat: number;
    found_lng: number;
};
export declare const generateFoundMatchEmailTemplate: (args: {
    found: FoundPetForEmail;
    lost: LostPetMatch;
}) => string;
