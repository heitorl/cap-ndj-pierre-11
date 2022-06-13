import { MigrationInterface, QueryRunner } from "typeorm";

export class initialCommit1655145264480 implements MigrationInterface {
    name = 'initialCommit1655145264480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "discounts" ("discountId" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_b5cc43939422e2a8c05b6d70931" PRIMARY KEY ("discountId"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("paymentId" uuid NOT NULL DEFAULT uuid_generate_v4(), "dateEmission" TIMESTAMP NOT NULL DEFAULT now(), "liquidValue" integer NOT NULL, "brut_value" integer NOT NULL, "collaboratorCollaboratorId" uuid, CONSTRAINT "PK_ae0b0903f275c81d8a2a45ce3b5" PRIMARY KEY ("paymentId"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("transactionId" uuid NOT NULL DEFAULT uuid_generate_v4(), "dateEmission" TIMESTAMP NOT NULL DEFAULT now(), "dateDeadline" character varying, "value" integer NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "paymentPaymentId" uuid, "busineBusineId" uuid, "collaboratorCollaboratorId" uuid, CONSTRAINT "REL_b5077d110e686e55e48f860857" UNIQUE ("paymentPaymentId"), CONSTRAINT "PK_1eb69759461752029252274c105" PRIMARY KEY ("transactionId"))`);
        await queryRunner.query(`CREATE TABLE "business" ("busineId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "cnpj" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_4cca40c3813d4b88a83edb459bc" UNIQUE ("email"), CONSTRAINT "UQ_d871b59fcb850c9870d9d69c472" UNIQUE ("cnpj"), CONSTRAINT "PK_54bd7d683f9e6b81b53f8d6c945" PRIMARY KEY ("busineId"))`);
        await queryRunner.query(`CREATE TABLE "collaborators" ("collaboratorId" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "contact" character varying NOT NULL, "cpf" character varying NOT NULL, "isPaymaster" boolean NOT NULL DEFAULT false, "bankDataBankDataId" uuid, "busineBusineId" uuid, CONSTRAINT "UQ_b210f505222bd59004a77165857" UNIQUE ("email"), CONSTRAINT "UQ_fa7ec23129d7651aed5b6ce06ee" UNIQUE ("cpf"), CONSTRAINT "REL_ca30351db9ad16874d7d28a0f8" UNIQUE ("bankDataBankDataId"), CONSTRAINT "PK_3ea46bc6ecc170ce1aa5f003403" PRIMARY KEY ("collaboratorId"))`);
        await queryRunner.query(`CREATE TABLE "bank_data" ("bankDataId" uuid NOT NULL DEFAULT uuid_generate_v4(), "pix" TIMESTAMP NOT NULL DEFAULT now(), "agencia" character varying NOT NULL, "conta" character varying NOT NULL, "banco" character varying NOT NULL, "collaboratorCollaboratorId" uuid, CONSTRAINT "REL_0dd942429cd2a837f51eb6579f" UNIQUE ("collaboratorCollaboratorId"), CONSTRAINT "PK_364ce0c6a34617fca46e9d335a4" PRIMARY KEY ("bankDataId"))`);
        await queryRunner.query(`CREATE TABLE "discounts_payments_payments" ("discountsDiscountId" uuid NOT NULL, "paymentsPaymentId" uuid NOT NULL, CONSTRAINT "PK_7e15558f6d5645f91e4e494128d" PRIMARY KEY ("discountsDiscountId", "paymentsPaymentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6d5e8d028d12c2f1b44b2a71b9" ON "discounts_payments_payments" ("discountsDiscountId") `);
        await queryRunner.query(`CREATE INDEX "IDX_62470a48a730130ce0d70e8890" ON "discounts_payments_payments" ("paymentsPaymentId") `);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_075d74b9e7138e0fabf8165875d" FOREIGN KEY ("collaboratorCollaboratorId") REFERENCES "collaborators"("collaboratorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_b5077d110e686e55e48f8608578" FOREIGN KEY ("paymentPaymentId") REFERENCES "payments"("paymentId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_28e4b0d21307a780975724a667a" FOREIGN KEY ("busineBusineId") REFERENCES "business"("busineId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_1e8a74c01e4219b2cb602476aac" FOREIGN KEY ("collaboratorCollaboratorId") REFERENCES "collaborators"("collaboratorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborators" ADD CONSTRAINT "FK_ca30351db9ad16874d7d28a0f89" FOREIGN KEY ("bankDataBankDataId") REFERENCES "bank_data"("bankDataId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborators" ADD CONSTRAINT "FK_6778e7378033a553ddbcae57f87" FOREIGN KEY ("busineBusineId") REFERENCES "business"("busineId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_data" ADD CONSTRAINT "FK_0dd942429cd2a837f51eb6579f1" FOREIGN KEY ("collaboratorCollaboratorId") REFERENCES "collaborators"("collaboratorId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "discounts_payments_payments" ADD CONSTRAINT "FK_6d5e8d028d12c2f1b44b2a71b9f" FOREIGN KEY ("discountsDiscountId") REFERENCES "discounts"("discountId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "discounts_payments_payments" ADD CONSTRAINT "FK_62470a48a730130ce0d70e88905" FOREIGN KEY ("paymentsPaymentId") REFERENCES "payments"("paymentId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discounts_payments_payments" DROP CONSTRAINT "FK_62470a48a730130ce0d70e88905"`);
        await queryRunner.query(`ALTER TABLE "discounts_payments_payments" DROP CONSTRAINT "FK_6d5e8d028d12c2f1b44b2a71b9f"`);
        await queryRunner.query(`ALTER TABLE "bank_data" DROP CONSTRAINT "FK_0dd942429cd2a837f51eb6579f1"`);
        await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_6778e7378033a553ddbcae57f87"`);
        await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_ca30351db9ad16874d7d28a0f89"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_1e8a74c01e4219b2cb602476aac"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_28e4b0d21307a780975724a667a"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_b5077d110e686e55e48f8608578"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_075d74b9e7138e0fabf8165875d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62470a48a730130ce0d70e8890"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6d5e8d028d12c2f1b44b2a71b9"`);
        await queryRunner.query(`DROP TABLE "discounts_payments_payments"`);
        await queryRunner.query(`DROP TABLE "bank_data"`);
        await queryRunner.query(`DROP TABLE "collaborators"`);
        await queryRunner.query(`DROP TABLE "business"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "discounts"`);
    }

}
