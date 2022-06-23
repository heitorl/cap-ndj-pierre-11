import { MigrationInterface, QueryRunner } from "typeorm";

export class initialCommit1655299154164 implements MigrationInterface {
    name = 'initialCommit1655299154164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_data" DROP COLUMN "pix"`);
        await queryRunner.query(`ALTER TABLE "bank_data" ADD "pix" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_data" DROP COLUMN "pix"`);
        await queryRunner.query(`ALTER TABLE "bank_data" ADD "pix" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
