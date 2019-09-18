const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
  let animal = req.body;
  const queryText = `INSERT INTO "trophies" ("animals_id", "weight", "points", "buck_score", "user_id")
  Values($1, $2, $3, $4, $5)`;
  pool.query(queryText, [animal.id, +(animal.weight), +(animal.points), +(animal.score), req.user.id])
  .then(() => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('error in animal Post', error);
  });
});

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "trophies" WHERE "user_id" = $1;`;
  pool.query(queryText, [req.user.id])
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('error in animal GET', error);
    res.sendStatus(500);
  })
})

module.exports = router