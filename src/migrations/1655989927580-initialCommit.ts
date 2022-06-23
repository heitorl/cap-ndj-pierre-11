import { MigrationInterface, QueryRunner } from "typeorm";

export class initialCommit1655989927580 implements MigrationInterface {
    name = 'initialCommit1655989927580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discounts" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "discounts" ADD "value" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "liquidValue"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "liquidValue" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "brut_value"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "brut_value" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "value" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "value" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "brut_value"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "brut_value" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "liquidValue"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "liquidValue" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "discounts" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "discounts" ADD "value" integer NOT NULL`);
    }

}
