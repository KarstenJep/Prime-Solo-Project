const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for batch (add hop_addition) tables
router.get('/', (req, res) => {
    pool
    .query(`SELECT * FROM batch
            JOIN hops ON batch.id = hops.batch_id;`)
        .then((results) => {
            res.send(results.rows);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log('Error in GET /batch', err);
        })
  });

  module.exports = router;