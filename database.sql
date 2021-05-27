
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Test tables below...
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"number" VARCHAR (10)
);

CREATE TABLE "batch" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (60),
	"batch_num" INTEGER,
	"tank" INTEGER,
	"complete" BOOLEAN DEFAULT FALSE,
	"user_id" INT REFERENCES "user" NOT NULL
);

CREATE TABLE "hops" (
	"hop_id" SERIAL PRIMARY KEY,
	"hop_name" VARCHAR (60) NOT NULL,
	"amount" INTEGER NOT NULL,
	"unit" VARCHAR (10) NOT NULL,
	"date" DATE,
	"complete" BOOLEAN DEFAULT FALSE,
	"batch_id" INT REFERENCES "batch" NOT NULL
);

-- Test data below

INSERT INTO "user" ("username", "password", "number")
VALUES ('kjepsen86@gmail.com', 'snowboard', 6514429080),
('karstenjepsen@q.com', 'karsten', 6514429080);

INSERT INTO "batch" ("name", "batch_num", "tank", "user_id")
VALUES ('Cabin Daze IPA', 333, 8, 1),
('Bad Axe DIPA', 334, 11, 1),
('Fine! IPA', 335, 4, 2),
('Sweet Digs NEIPA', 336, 13, 2);

INSERT INTO "hops" ("hop_name", "amount", "unit", "date", "batch_id")
VALUES ('Citra', 80, 'oz', '5-31-2021', 1),
('Citra', 60, 'oz', '6-2-2021', 1),
('Centennial', 5, 'lbs', '5-30-2021', 2),
('Mosaic', 60, 'oz', '6-3-2021', 3),
('Azacca', 40, 'oz', '6-6-2021', 3),
('Julius', 50, 'oz', '6-6-2021', 3),
('Strata', 100, 'oz', '6-1-2021', 4);

SELECT movies.title, movies.description, ARRAY_AGG(genres.name) as genres, movies.poster FROM movies
JOIN movies_genres ON movies.id = movies_genres.movie_id
JOIN genres ON movies_genres.genre_id = genres.id
WHERE movies.id = 11 GROUP BY movies.title, movies.description, movies.poster;

--- schedule
SELECT batch.name, batch."tank", batch."batch_num", ARRAY_AGG(hops.hop_id) as hopid, ARRAY_AGG(hops.hop_name) as hop_name, ARRAY_AGG(hops.amount) as amount, ARRAY_AGG(hops.unit) as unit, ARRAY_AGG(hops.date) as date
FROM batch
JOIN hops ON batch.id = hops.batch_id
GROUP BY batch.name, batch."tank", batch."batch_num"
;

-- daily hops
SELECT * FROM batch
JOIN hops ON batch.id = hops.batch_id
WHERE hops."date" = '05/31/2021', $1;