import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1716572888539 implements MigrationInterface {
    name = 'Migration1716572888539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "estate_manager"
            ADD "registrationToken" character varying(255) NOT NULL DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "workman"
            ADD "registrationToken" character varying(255) NOT NULL DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "registrationToken" character varying(255) NOT NULL DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "super_user"
            ADD "registrationToken" character varying(255) NOT NULL DEFAULT ''
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_manager" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_manager"
            ADD "password" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "workman" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "workman"
            ADD "password" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "super_user" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "super_user"
            ADD "password" character varying(255) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "super_user" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "super_user"
            ADD "password" character varying(256) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying(256) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "workman" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "workman"
            ADD "password" character varying(256) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_manager" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_manager"
            ADD "password" character varying(256) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "super_user" DROP COLUMN "registrationToken"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "registrationToken"
        `);
        await queryRunner.query(`
            ALTER TABLE "workman" DROP COLUMN "registrationToken"
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_manager" DROP COLUMN "registrationToken"
        `);
    }

}
