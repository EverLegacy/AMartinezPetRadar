import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import type { Point } from "typeorm";

@Entity("found_pets")
export class FoundPet {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text" })
    species!: string;

    @Column({ type: "text", nullable: true })
    breed!: string | null;

    @Column({ type: "text" })
    color!: string;

    @Column({ type: "text" })
    size!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "text", nullable: true })
    photo_url!: string | null;

    @Column({ type: "text" })
    finder_name!: string;

    @Column({ type: "text" })
    finder_email!: string;

    @Column({ type: "text" })
    finder_phone!: string;

    @Column({
        type: "geometry",
        spatialFeatureType: "Point",
        srid: 4326,
    })
    location!: Point;

    @Column({ type: "text" })
    address!: string;

    @Column({ type: "timestamptz" })
    found_date!: Date;

    @CreateDateColumn({ type: "timestamptz" })
    created_at!: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at!: Date;
}

