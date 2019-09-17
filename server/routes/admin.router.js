const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

router.get('/trophy', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "trophies" WHERE NOT "trophies".is_approved;`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('error in admin trophy GET', error);
    res.sendStatus(500);
  });
});

router.get('/user', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT "id", "username", "name" FROM "users" WHERE NOT "users".is_approved;`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('error in admin user GET', error);
    res.sendStatus(500);
  });
});

module.exports = router;