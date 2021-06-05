const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for batch + hop_additions by ID
router.get('/:id', (req, res) => {
    console.log('in router get', req.params.id);
    const getQuery = `SELECT 
                            batch.*,
                                    CASE WHEN count(h) = 0 THEN ARRAY[]::json[] ELSE array_agg(h.hops) END AS hops,
                                    json_build_object('id', "user".id, 'username', "user".username) as "user"
                            FROM batch
                            JOIN "user" ON batch.user_id = "user".id
                            LEFT OUTER JOIN (
                                SELECT batch_id, json_build_object('hop_id', hops.hop_id, 'batch_id', hops.batch_id, 'hop_name', 		hops.hop_name, 'amount', hops.amount, 'unit', hops.unit, 'date', hops.date, 'complete', 				hops.complete) as hops
                                FROM hops ORDER BY hops.date
                                ) h on h.batch_id=batch.id
                                WHERE batch.id=$1
                            GROUP BY batch.id, batch.name, batch.batch_num, batch.tank, "user".id, "user".username
                        ;`
    pool.query(getQuery, [req.params.id])
        .then((results) => {
            res.send(results.rows);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log('Error in GET batch by ID', err);
        })
  });

  router.put('/', (req, res) => {
      console.log('Checking put', req.params.id, 'body=', req.body);
      const updateQuery = `UPDATE batch SET name=$1, style=$2, tank=$3, batch_num=$4 WHERE id=$5`
      pool
    .query(updateQuery, [req.body.name, req.body.style, req.body.tank, req.body.batch_num, req.body.id])
        .then((results) => {
            res.send(results.rows);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log('Error in PUT batch', err);
        })
  })

  router.put('/complete/:id', (req, res) => {
    console.log('Checking put', req.params.id, 'body=', req.body);
    const completeQuery = `UPDATE hops SET complete=true WHERE hop_id=$1`
    pool
  .query(completeQuery, [req.params.id])
      .then((results) => {
          res.send(results.rows);
      })
      .catch(err => {
          res.sendStatus(500);
          console.log('Error in PUT complete', err);
      })
})

  module.exports = router;