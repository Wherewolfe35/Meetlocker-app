const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

//obtains all users and the total stats of their bagged animals
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "users"."name" AS "Name", COALESCE(sum("trophies".buck_score), 0) AS "Total Buck Score",
COALESCE(sum("trophies".points), 0) AS "Total Points", COALESCE(count("trophies".animals_id), 0) AS "Total Kills", 
COALESCE(sum("trophies".weight), 0) AS "Total Weight", array_agg("animals".id) AS "Bagged" FROM "trophies"
FULL OUTER JOIN "users" ON "trophies".user_id = "users".id
LEFT JOIN "animals" ON "animals".id = "trophies".animals_id
WHERE "trophies".is_approved OR "users".is_approved
GROUP BY "users"."name";`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in leaderboard GET', error);
      res.sendStatus(500);
    });
});

// obtains list of animals from the database
router.get('/animals', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "animals";`;
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in animals GET', error);
      res.sendStatus(500);
    })
})

module.exports = router;