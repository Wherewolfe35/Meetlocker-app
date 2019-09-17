const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/trophy', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "trophies" WHERE NOT "trophies".is_approved;`;
  if (req.user.isAdmin){
  pool.query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error in admin trophy GET', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

router.get('/user', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "id", "username", "name" FROM "users" WHERE NOT "users".is_approved;`;
  if (req.user.isAdmin) {
    pool.query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log('error in admin user GET', error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.delete('/user/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "users" WHERE "users".id = $1;`;
  if (req.user.isAdmin) {
    pool.query(queryText, [req.params.id])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('error in admin user DELETE', error);
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
});

router.put('/user', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "users" SET "is_approved" = true WHERE "id" = $1;`;
  if (req.user.isAdmin) {
    pool.query(queryText, [req.body.id])
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log('error in admin user PUT', error);
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
});

router.delete('/trophy/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "trophies" WHERE "trophies".id = $1;`;
  if (req.user.isAdmin) {
    pool.query(queryText, [req.params.id])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('error in admin trophy DELETE', error);
        res.sendStatus(500);
      })
  } else { res.sendStatus(403); }
});

router.put('/trophy', rejectUnauthenticated, (req, res) => {
  const queryText = `UPDATE "trophies" SET "is_approved" = true WHERE "id" = $1;`;
  if (req.user.isAdmin) {
  pool.query(queryText, [req.body.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('error in admin trophy PUT', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;