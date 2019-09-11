const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "logs".id, "logs".post, "logs".user_id, "logs".date, "users"."name" FROM "logs"
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
  let log = req.body;
  const queryText = `INSERT INTO "logs" ("post", "date", "user_id")
    VALUES ($1, $2, $3);`;
  pool.query(queryText, [log.text, log.date, req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error in log POST', error);
      res.sendStatus(500);
    });
});

router.post('/comment', rejectUnauthenticated, (req, res) => {
  let comment = req.body;
  const queryText = `INSERT INTO "comments" ("comments_post", "logs_id", "users_id") 
  VALUES($1, $2, $3) ;`;
  pool.query(queryText, [comment.text, comment.id, req.user.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error in comment POST', error);
      res.sendStatus(500);
    });
});

router.get('/comment', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "comments".id, "comments".comments_post, 
  "comments".logs_id, "comments".users_id, "users"."name" 
  FROM "comments"
  JOIN "users" on "users".id = "comments".users_id;;`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('error in comment GET', error);
  });
});

module.exports = router;