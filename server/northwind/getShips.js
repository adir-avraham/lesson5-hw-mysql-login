const express = require('express');
const router = express.Router();
const pool = require('../db/pool');


router.get('/', async (req, res, next) => {
     
    try{
        const result = await pool.execute(getShipsQuery());
        const [first] = result
        return res.json(first);
    } catch {
        return res.json("some error");
    }
})

function getShipsQuery() {
    return 'SELECT distinct(ship_city) FROM northwind.orders';
}

module.exports = router;