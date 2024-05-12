import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1715536181047 implements MigrationInterface {
    name = 'Migration1715536181047';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "client_rating" (
                "id" SERIAL NOT NULL,
                "stars" integer NOT NULL,
                "comment" text NOT NULL,
                "date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_87ad376343a3439d48fe4e2c3c8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "workman_rating" (
                "id" SERIAL NOT NULL,
                "stars" integer NOT NULL,
                "comment" text NOT NULL,
                "date" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_2df903881e7bf8e8c8f74d00632" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request"
            ADD "clientRatingId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request"
            ADD CONSTRAINT "UQ_36347b8f3e6045a85bd6201d650" UNIQUE ("clientRatingId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request"
            ADD "workerRatingId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request"
            ADD CONSTRAINT "UQ_e34475257c98fca32d7041c920c" UNIQUE ("workerRatingId")
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_request"
            ADD "clientRatingId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_request"
            ADD CONSTRAINT "UQ_0bda29acd2511b69f6c19f7d396" UNIQUE ("clientRatingId")
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_request"
            ADD "workerRatingId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_request"
            ADD CONSTRAINT "UQ_f8d8d042dc6c3435bceca87f435" UNIQUE ("workerRatingId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request"
            ADD CONSTRAINT "FK_36347b8f3e6045a85bd6201d650" FOREIGN KEY ("clientRatingId") REFERENCES "client_rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request"
            ADD CONSTRAINT "FK_e34475257c98fca32d7041c920c" FOREIGN KEY ("workerRatingId") REFERENCES "workman_rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_request"
            ADD CONSTRAINT "FK_0bda29acd2511b69f6c19f7d396" FOREIGN KEY ("clientRatingId") REFERENCES "client_rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_request"
            ADD CONSTRAINT "FK_f8d8d042dc6c3435bceca87f435" FOREIGN KEY ("workerRatingId") REFERENCES "workman_rating"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "estate_request" DROP CONSTRAINT "FK_f8d8d042dc6c3435bceca87f435"
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_request" DROP CONSTRAINT "FK_0bda29acd2511b69f6c19f7d396"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request" DROP CONSTRAINT "FK_e34475257c98fca32d7041c920c"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request" DROP CONSTRAINT "FK_36347b8f3e6045a85bd6201d650"
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_request" DROP CONSTRAINT "UQ_f8d8d042dc6c3435bceca87f435"
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_request" DROP COLUMN "workerRatingId"
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_request" DROP CONSTRAINT "UQ_0bda29acd2511b69f6c19f7d396"
        `);
        await queryRunner.query(`
            ALTER TABLE "estate_request" DROP COLUMN "clientRatingId"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request" DROP CONSTRAINT "UQ_e34475257c98fca32d7041c920c"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request" DROP COLUMN "workerRatingId"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request" DROP CONSTRAINT "UQ_36347b8f3e6045a85bd6201d650"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_request" DROP COLUMN "clientRatingId"
        `);
        await queryRunner.query(`
            DROP TABLE "workman_rating"
        `);
        await queryRunner.query(`
            DROP TABLE "client_rating"
        `);
    }
}
