import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from "class-validator";

export class CreateFoundPetDto {
    @IsString()
    @IsNotEmpty()
    species!: string;

    @IsOptional()
    @IsString()
    breed?: string;

    @IsString()
    @IsNotEmpty()
    color!: string;

    @IsString()
    @IsNotEmpty()
    size!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsOptional()
    @IsUrl()
    photo_url?: string;

    @IsString()
    @IsNotEmpty()
    finder_name!: string;

    @IsEmail()
    finder_email!: string;

    @IsString()
    @IsNotEmpty()
    finder_phone!: string;

    @IsNumber()
    @Min(-90)
    @Max(90)
    lat!: number;

    @IsNumber()
    @Min(-180)
    @Max(180)
    lng!: number;

    @IsString()
    @IsNotEmpty()
    address!: string;

    @IsDateString()
    found_date!: string;
}

