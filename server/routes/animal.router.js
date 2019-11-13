const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.post('/', rejectUnauthenticated, (req, res) => {
  let animal = req.body;
  const queryText = `INSERT INTO "trophies" ("animals_id", "weight", "points", "buck_score", "year", "user_id")
  Values($1, $2, $3, $4, $5, $6)`;
  pool.query(queryText, [animal.id, +(animal.weight), +(animal.points), +(animal.score), +(animal.year), req.user.id])
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
    let totalScore = 0;
    let totalPoints = 0;
    let totalWeight = 0;
    for (let trophy of result.rows) {
      totalScore += +(trophy.buck_score);
      totalPoints += trophy.points;
      totalWeight += trophy.weight;
    }
    result.rows[0].totalScore = totalScore;
    result.rows[0].totalPoints = totalPoints;
    result.rows[0].totalWeight = totalWeight;
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('error in animal GET', error);
    res.sendStatus(500);
  })
})

module.exports = router