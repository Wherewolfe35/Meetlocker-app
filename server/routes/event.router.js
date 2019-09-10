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

router.post('/', (req, res) => {

});

module.exports = router;