const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for batch (add hop_addition) tables
router.get('/', (req, res) => {
    pool
    .query(`
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
    console.log('in delete route', req.params.id, req.user.id);
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

  module.exports = router;