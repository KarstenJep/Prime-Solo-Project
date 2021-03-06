const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET route for batches
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`
    SELECT
    batch.*,
        CASE WHEN count(h) = 0 THEN ARRAY[]::json[] ELSE array_agg(h.hops) END AS hops,
        json_build_object('id', "user".id, 'username', "user".username) as "user"
    FROM batch
    JOIN "user" ON batch.user_id = "user".id
    LEFT OUTER JOIN (
      SELECT batch_id, json_build_object('hop_id', hops.hop_id, 'batch_id', hops.batch_id, 'hop_name', hops.hop_name, 'amount', hops.amount, 'unit', hops.unit, 'date', hops.date, 'complete', hops.complete) as hops
      FROM hops ORDER BY hops.hop_id
      ) h on h.batch_id=batch.id
    GROUP BY batch.id, batch.name, batch.batch_num, batch.tank, "user".id, "user".username ORDER BY batch.batch_num
    ;`)
        .then((results) => {
            res.send(results.rows);
            // res.sendStatus(200) 
        })
        .catch(err => {
            res.sendStatus(500);
            console.log('Error in GET /batch', err);
        })
  });

  // POST route for Add Batch
  router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    const beer = req.body.beer
    const hops = req.body.hops
    const batchQuery = `
    INSERT INTO "batch" ("name", "style", "tank", "batch_num", "user_id")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING "id";` // RETURNING "id" will give us back the id of the created batch
    
    // First query creates new batch
    pool.query(batchQuery, [beer.name, beer.style, beer.tank, beer.batch, beer.user_id])
    .then(result => {
        console.log('New batch id', result.rows[0].id);
        const newBatchId = result.rows[0].id
        const hopsQuery = `
        INSERT INTO "hops" ("batch_id", "hop_name", "amount", "unit", "date")
        VALUES ($1, $2, $3, $4, $5)`

        // .map through hop additions for 2nd query
        hops.map(addition => {
            pool.query(hopsQuery, [newBatchId, addition.hop_name, addition.amount, addition.unit, addition.date])
            .then(result => {
                res.sendStatus(201);
            })
            .catch(err => {
                console.log(err);
                // res.sendStatus(500)
            })
        }) // end of .map
    }) 
    .catch(err => {
        console.log(err);
        res.sendStatus(500)
    })
  });

  // Delete for batch plus hops
  router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in delete batch route', req.params.id, req.user.id);
    const queryText = 'DELETE FROM batch WHERE id=$1 AND user_id=$2;';
    pool.query(queryText, [req.params.id, req.user.id])
      .then(() => { 
        console.log('Deleted batch')
        res.sendStatus(200) 
       })
      .catch(err => {
        console.log('Error in deleting item', err);
        res.sendStatus(500);
      });
  });

  // Delete for just hops
  router.delete('/hops/:id', rejectUnauthenticated, (req, res) => {
    console.log('in delete hops route', req.params.id, req.user.id);
    const queryText = 'DELETE FROM hops WHERE hop_id=$1 RETURNING batch_id;';
    pool.query(queryText, [req.params.id])
      .then((result) => { 
        console.log('Deleted hops', req.body, result.rows[0])
        res.send(result.rows[0])
        // res.sendStatus(200) 
       })
      .catch(err => {
        console.log('Error in deleting item', err);
        res.sendStatus(500);
      });
  });

  


  module.exports = router;