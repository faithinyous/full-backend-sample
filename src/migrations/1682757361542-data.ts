import { MigrationInterface, QueryRunner } from "typeorm";

export class Data1682757361542 implements MigrationInterface {
    name = 'Data1682757361542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`CREATE INDEX "IDX_e755f0405ca0c3cbc8ae7ca95f" ON "user" ("firstname", "lastname") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e755f0405ca0c3cbc8ae7ca95f"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(255)`);
    }

}
