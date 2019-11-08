--Database name, "meetlocker"

CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"username" character varying(80) NOT NULL,
	"password" VARCHAR(500) NOT NULL,
	"name" character varying(80) NOT NULL,
	"isAdmin" BOOLEAN NOT NULL DEFAULT 'false',
	"is_approved" BOOLEAN NOT NULL DEFAULT 'false'
) WITH (
  OIDS=FALSE
);



CREATE TABLE "logs" (
	"id" serial PRIMARY KEY,
	"log_post" VARCHAR(1500) NOT NULL,
	"user_id" INT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"id" serial PRIMARY KEY,
	"comments_post" VARCHAR(1200) NOT NULL,
	"logs_id" INT NOT NULL,
	"users_id" INT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "trophies" (
	"id" serial PRIMARY KEY,
	"animals_id" int NOT NULL,
	"weight" INT,
	"points" INT,
	"buck_score" INT,
	"user_id" INT NOT NULL,
	"is_approved" BOOLEAN NOT NULL DEFAULT 'false',
	"year" INT
) WITH (
  OIDS=FALSE
);



CREATE TABLE "animals" (
	"id" serial PRIMARY KEY,
	"name" character varying(80) NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "hunterClubs" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users_hunterClubs" (
	"id" serial PRIMARY KEY,
	"user_id" int NOT NULL,
	"hunterClubs_id" int NOT NULL
	"year_inducted" INT NOT NULL
) WITH (
  OIDS=FALSE
);

CREATE TABLE "events"(
"id" SERIAL PRIMARY KEY,
"title" VARCHAR(255), NOT NULL
"start_date" VARCHAR(20),
"end_date" VARCHAR(20),
"user_id" INT REFERENCES "users")
;




ALTER TABLE "logs" ADD CONSTRAINT "logs_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("logs_id") REFERENCES "logs"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("users_id") REFERENCES "users"("id");

ALTER TABLE "trophies" ADD CONSTRAINT "trophies_fk0" FOREIGN KEY ("animals_id") REFERENCES "animals"("id");
ALTER TABLE "trophies" ADD CONSTRAINT "trophies_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "users_hunterClubs" ADD CONSTRAINT "users_hunterClubs_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "users_hunterClubs" ADD CONSTRAINT "users_hunterClubs_fk1" FOREIGN KEY ("hunterClubs_id") REFERENCES "hunterClubs"("id");

INSERT INTO "public"."hunterClubs"("name") VALUES('Locker Legend') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('Winger Dinger') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('4 by Fur') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('Rodent Rampage') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('50 Kills') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('100 Kills') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('250 Kills') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('50 Points') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('100 Points') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('200 Points') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('1000 Lbs') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('5000 Lbs') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('10000 Lbs') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('1000 Wolfe Score') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('5000 Wolfe Score') RETURNING "id", "name";
INSERT INTO "public"."hunterClubs"("name") VALUES('10000 Wolfe Score') RETURNING "id", "name";

INSERT INTO "animals" ("name") VALUES ('Buck(not nub)'),('Doe'),('Nubbin buck'),('Turkey'), ('Grouse'), ('Woodcock'),('Duck'),('Coyote'),('Old Grey Squirrel'),('Red Squirrel'),('Rabbits'),('Racoon'),('Crow'),('Beaver'),('Porcupine');