import { MigrationInterface, QueryRunner } from "typeorm";

export class initialCommit1655249800022 implements MigrationInterface {
    name = 'initialCommit1655249800022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_ca30351db9ad16874d7d28a0f89"`);
        await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "REL_ca30351db9ad16874d7d28a0f8"`);
        await queryRunner.query(`ALTER TABLE "collaborators" DROP COLUMN "bankDataBankDataId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collaborators" ADD "bankDataBankDataId" uuid`);
        await queryRunner.query(`ALTER TABLE "collaborators" ADD CONSTRAINT "REL_ca30351db9ad16874d7d28a0f8" UNIQUE ("bankDataBankDataId")`);
        await queryRunner.query(`ALTER TABLE "collaborators" ADD CONSTRAINT "FK_ca30351db9ad16874d7d28a0f89" FOREIGN KEY ("bankDataBankDataId") REFERENCES "bank_data"("bankDataId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
