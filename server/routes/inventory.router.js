const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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

  module.exports = router;