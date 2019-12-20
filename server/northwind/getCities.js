const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

router.get('/', async ( req, res, next) => {

    try {
        const result = await pool.execute(getCities());
        const [first] = result;
        return res.json(first.map(row => row.city ));
    } catch {
        res.json("some error")
    }


})


function getCities() {
    return 'SELECT distinct(customers.city) FROM customers WHERE city IS NOT NULL';
}



module.exports = router;