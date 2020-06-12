import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1591916383027 implements MigrationInterface {
    name = 'Initial1591916383027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lesson" ("id" SERIAL NOT NULL, "studentId" integer NOT NULL, "teacherId" integer NOT NULL, "datetime" TIMESTAMP NOT NULL, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "availability" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "datetime" TIMESTAMP NOT NULL, "available" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_05a8158cf1112294b1c86e7f1d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("name" character varying(7) NOT NULL, CONSTRAINT "PK_ae4578dcaed5adff96595e61660" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "instrument" ("name" character varying(20) NOT NULL, CONSTRAINT "PK_efda620b8e7e274a712072e2afb" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(35) NOT NULL, "lastName" character varying(35) NOT NULL, "email" character varying NOT NULL, "roleName" character varying(7), "instrumentName" character varying(20), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("userId" integer NOT NULL, "password" character varying(64) NOT NULL, CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId"), CONSTRAINT "PK_373ead146f110f04dad60848154" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_a67245be78e8fc70268144d64b5" FOREIGN KEY ("studentId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_5b70ab4b9466eb06172dc279941" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "availability" ADD CONSTRAINT "FK_42a42b693f05f17e56d1d9ba93f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ccf9b0ec984324d7ad5f861a493" FOREIGN KEY ("roleName") REFERENCES "role"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_b5b2030a4c81e61c5d63821e642" FOREIGN KEY ("instrumentName") REFERENCES "instrument"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_b5b2030a4c81e61c5d63821e642"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ccf9b0ec984324d7ad5f861a493"`);
        await queryRunner.query(`ALTER TABLE "availability" DROP CONSTRAINT "FK_42a42b693f05f17e56d1d9ba93f"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_5b70ab4b9466eb06172dc279941"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_a67245be78e8fc70268144d64b5"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "instrument"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "availability"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
    }

}
