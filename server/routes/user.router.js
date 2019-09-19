const express = require('express');
const { rejectUnauthenticated, rejectUnapproved } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const name = req.body.name;

  const queryText = 'INSERT INTO "users" (username, password, name) VALUES ($1, $2, $3) RETURNING id';
  pool.query(queryText, [username, password, name])
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500)
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), rejectUnapproved, (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

//update database with new user name, username, or both
router.put('/', rejectUnauthenticated, (req, res) => {
  let columnNames = Object.keys(req.body);
  console.log(columnNames);
  if (columnNames.length === 2) {
    const queryText = `UPDATE "users" SET "name" = $1, "username" = $2 WHERE "id" = $3;`;
    pool.query(queryText, [req.body.name, req.body.username, req.user.id])
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('error in user PUT', error);
      });
  } else if (columnNames.length === 1) {
    const queryText = `UPDATE "users" SET ${columnNames[0]} = $1 WHERE "id" = $2;`;
    if (columnNames[0] === 'name') {
      pool.query(queryText, [req.body.name, req.user.id])
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log('error in user PUT', error);
          res.sendStatus(500);
        });
    } else {
      pool.query(queryText, [req.body.username, req.user.id])
        .then(() => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log('error in user PUT', error);
          res.sendStatus(500);
        });
    }
  }
});

module.exports = router;
