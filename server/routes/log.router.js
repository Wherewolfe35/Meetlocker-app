const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT "logs".id, "logs".post, "logs".user_id, "logs".date, "users"."name" FROM "logs"
    JOIN "users" ON "users".id = "logs".user_id;`;
    pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in log GET', error);
      res.sendStatus(500);
    })
});

router.post('/', rejectUnauthenticated, (req, res) => {

});

module.exports = router;