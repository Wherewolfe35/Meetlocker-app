const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

//gets event list from the database
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * from "events"`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log('error in event GET', error);
    res.sendStatus(500);
  })
});

router.post('/', rejectUnauthenticated, (req, res) => {
  let event = req.body
  let queryText = `INSERT INTO "events" ("title", "start_date", "end_date", "user_id") VALUES ($1, $2, $3, $4);`;
  pool.query(queryText, [event.title, event.startDate, event.endDate, req.user.id])
  .then(() => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.log('error in event POST', error);
    res.sendStatus(500);
  })
});

module.exports = router;