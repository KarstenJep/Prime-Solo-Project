const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET count of all hops in database, by hop name
router.get('/', (req, res) => {
    console.log('in router inventory get', req.body);
    const inventoryQuery = `SELECT hops.hop_name, SUM(hops.amount), hops.unit  
                            FROM hops
                            WHERE hops.complete=false
                            GROUP BY hops.hop_name, hops.unit
                            ;`
    pool.query(inventoryQuery)
        .then((results) => {
            res.send(results.rows);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log('Error in GET inventory', err);
        })
  });

  // GET all hop additions, order by date
  router.get('/additions', (req, res) => {
    console.log('in router inventory get', req.body);
    const additionsQuery = `SELECT * FROM hops
                            JOIN batch ON batch.id = hops.batch_id
                            ORDER BY hops.date
                            ;`
    pool.query(additionsQuery)
        .then((results) => {
            res.send(results.rows);
        })
        .catch(err => {
            res.sendStatus(500);
            console.log('Error in GET inventory', err);
        })
  });

  module.exports = router;