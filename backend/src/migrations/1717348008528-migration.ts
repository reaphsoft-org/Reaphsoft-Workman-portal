import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1717348008528 implements MigrationInterface {
    name = 'Migration1717348008528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "verification_token" (
                "id" SERIAL NOT NULL,
                "token" character varying(255) NOT NULL,
                "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_74bc3066ea24f13f37d52a12c79" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_manager"
            ADD "active" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "workman"
            ADD "active" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "active" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "super_user"
            ADD "active" boolean NOT NULL DEFAULT false
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "super_user" DROP COLUMN "active"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "active"
        `);
        await queryRunner.query(`
            ALTER TABLE "workman" DROP COLUMN "active"
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_manager" DROP COLUMN "active"
        `);
        await queryRunner.query(`
            DROP TABLE "verification_token"
        `);
    }

}
