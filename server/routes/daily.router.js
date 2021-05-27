const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for batch (add hop_addition) tables
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    const dailyQuery = `SELECT * FROM batch
    JOIN hops ON batch.id = hops.batch_id
    WHERE hops."date" = $1;`
    pool
    .query(dailyQuery, [req.params.id])
        .then((results) => {
            res.send(results.rows);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log('Error in GET /daily', err);
        })
  });

  module.exports = router;