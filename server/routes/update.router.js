const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route for batch (add hop_addition) tables
// router.get('/:id', (req, res) => {
//     console.log('in router get', req.params.id);
//     const updateQuery = `SELECT * FROM batch
//     JOIN hops ON batch.id = hops.batch_id
//     WHERE hops."date" = $1;`
//     pool
//     .query(updateQuery, [req.params.id])
//         .then((results) => {
//             res.send(results.rows);
//         })
//         .catch(err => {
//             res.sendStatus(500);
//             console.log('Error in GET /daily', err);
//         })
//   });

  router.put('/:id', (req, res) => {
      console.log('Checking put', req.params.id, 'body=', req.body);
      const updateQuery = `UPDATE batch SET name=$1, style=$2, tank=$3, batch_num=$4 WHERE id=$5`
      pool
    .query(updateQuery, [ldkfjsl])
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