import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntities1732134315476 implements MigrationInterface {
    name = 'AddEntities1732134315476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_methods" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "payment_method" character varying NOT NULL, CONSTRAINT "PK_34f9b8c6dfb4ac3559f7e2820d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "status" character varying NOT NULL, "payment_method_id" uuid, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TYPE "public"."user_gender_enum" RENAME TO "user_gender_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('M', 'F')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gender" TYPE "public"."user_gender_enum" USING "gender"::"text"::"public"."user_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum_old"`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_2d44d35774ef22e1a580ca062b2" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_2d44d35774ef22e1a580ca062b2"`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum_old" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "gender" TYPE "public"."user_gender_enum_old" USING "gender"::"text"::"public"."user_gender_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_gender_enum_old" RENAME TO "user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TABLE "payment_methods"`);
    }

}
