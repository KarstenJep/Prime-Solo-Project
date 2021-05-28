const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for batch (add hop_addition) tables
router.get('/', (req, res) => {
    pool
    .query(`SELECT batch.id, batch.name, batch.tank, batch.batch_num, ARRAY_AGG(hops.hop_id) as hop_id, ARRAY_AGG(hops.hop_name) as hop_name, ARRAY_AGG(hops.amount) as amount, ARRAY_AGG(hops.unit) as unit, ARRAY_AGG(hops.date) as date
            FROM batch
            JOIN hops ON batch.id = hops.batch_id
            GROUP BY batch.id, batch.name, batch.tank, batch.batch_num
            ORDER BY batch_num
            ;`)
        .then((results) => {
            res.send(results.rows);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log('Error in GET /batch', err);
        })
  });

  // POST route code here
  router.post('/', (req, res) => {
    console.log(req.body);
    const beer = req.body.beer
    const hops = req.body.hops
    const batchQuery = `
    INSERT INTO "batch" ("name", "tank", "batch_num", "user_id")
    VALUES ($1, $2, $3, $4)
    RETURNING "id";` // RETURNING "id" will give us back the id of the created batch
    
    // First query creates new batch
    pool.query(batchQuery, [beer.name, beer.tank, beer.batch, beer.user_id])
    .then(result => {
        console.log('New batch id', result.rows[0].id);
        const newBatchId = result.rows[0].id
        const hopsQuery = `
        INSERT INTO "hops" ("batch_id", "hop_name", "amount", "unit", "date")
        VALUES ($1, $2, $3, $4, $5)`

        hops.map(addition => {
            pool.query(hopsQuery, [newBatchId, addition.hop_name, addition.amount, addition.unit, addition.date])
            .then(result => {
                res.sendStatus(201);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500)
            })
        }) // end of .map
    }) // Catch for batch query
    .catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
  });

// removed  rejectUnauthenticated
  router.delete('/:id', (req, res) => {
    const queryText = 'DELETE FROM item WHERE id=$1 AND user_id=$2;';
    pool.query(queryText, [req.params.id, req.user.id])
      .then(() => { res.sendStatus(200) })
      .catch((error) => {
        console.log('Error in deleting item', error);
        res.sendStatus(500);
      });
  });

  module.exports = router;