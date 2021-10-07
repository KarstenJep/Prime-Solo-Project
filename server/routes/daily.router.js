const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// GET route for batches by date
router.get('/:id', rejectUnauthenticated, (req, res) => {
    // console.log('in router get', req.params.id);
    const dailyQuery = `SELECT * FROM batch
                        JOIN hops ON batch.id = hops.batch_id
                        WHERE hops."date" = $1;
                        ;`
    pool.query(dailyQuery, [req.params.id])
        .then((results) => {
            res.send(results.rows);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log('Error in GET /daily', err);
        })
  });

  module.exports = router;

  

// SELECT 
// 	batch.*,
// 			CASE WHEN count(h) = 0 THEN ARRAY[]::json[] ELSE array_agg(h.hops) END AS hops,
// 			json_build_object('id', "user".id, 'username', "user".username) as "user"
// 	FROM batch
// 	JOIN "user" ON batch.user_id = "user".id
// 	LEFT OUTER JOIN (
// 		SELECT batch_id, json_build_object('hop_id', hops.hop_id, 'batch_id', hops.batch_id, 'hop_name', 		hops.hop_name, 'amount', hops.amount, 'unit', hops.unit, 'date', hops.date, 'complete', 				hops.complete) as hops
// 		FROM hops WHERE hops.date=$1
// 		ORDER BY hops.date
// 		) h on h.batch_id=batch.id
// 		GROUP BY batch.id, batch.name, batch.batch_num, batch.tank, "user".id, "user".username