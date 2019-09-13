const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "logs".id, "logs".post, "logs".user_id, "logs".date, "users"."name" FROM "logs"
    JOIN "users" ON "users".id = "logs".user_id
    ORDER BY "logs".date;`;
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

router.delete('/:id/:userId', rejectUnauthenticated, (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    const queryText = `DELETE FROM "comments" WHERE "logs_id" = $1;`
    pool.query(queryText, [req.params.id])
      .then(() => {
        const queryText2 = `DELETE FROM "logs" WHERE "id" = $1;`;
        pool.query(queryText2, [req.params.id])
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log('error in log2 DELETE', error);
        });
      })
      .catch((error) => {
        console.log('error in log DELETE', error);
        res.sendStatus(500);
      });
  }
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "logs" SET "post" = $1 
  WHERE "id" = $2 AND "user_id" = $3;`;
  pool.query(queryText, [req.body.text, req.params.id, req.user.id])
  .then(() => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('error in log PUT', error);
    res.sendStatus(500);
  })
})

module.exports = router;