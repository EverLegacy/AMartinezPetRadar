import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePetRadarTables1772835931241 implements MigrationInterface {
    name = "CreatePetRadarTables1772835931241";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS postgis`);

        await queryRunner.query(`
            CREATE TABLE "lost_pets" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "species" character varying NOT NULL,
                "breed" character varying NOT NULL,
                "color" character varying NOT NULL,
                "size" character varying NOT NULL,
                "description" text NOT NULL,
                "photo_url" character varying,
                "owner_name" character varying NOT NULL,
                "owner_email" character varying NOT NULL,
                "owner_phone" character varying NOT NULL,
                "location" geometry(Point,4326) NOT NULL,
                "address" character varying NOT NULL,
                "lost_date" TIMESTAMPTZ NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_lost_pets_id" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`CREATE INDEX "IDX_lost_pets_location" ON "lost_pets" USING GIST ("location")`);
        await queryRunner.query(`CREATE INDEX "IDX_lost_pets_active" ON "lost_pets" ("is_active")`);

        await queryRunner.query(`
            CREATE TABLE "found_pets" (
                "id" SERIAL NOT NULL,
                "species" character varying NOT NULL,
                "breed" character varying,
                "color" character varying NOT NULL,
                "size" character varying NOT NULL,
                "description" text NOT NULL,
                "photo_url" character varying,
                "finder_name" character varying NOT NULL,
                "finder_email" character varying NOT NULL,
                "finder_phone" character varying NOT NULL,
                "location" geometry(Point,4326) NOT NULL,
                "address" character varying NOT NULL,
                "found_date" TIMESTAMPTZ NOT NULL,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_found_pets_id" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`CREATE INDEX "IDX_found_pets_location" ON "found_pets" USING GIST ("location")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_found_pets_location"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "found_pets"`);

        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_lost_pets_active"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_lost_pets_location"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "lost_pets"`);
    }
}

