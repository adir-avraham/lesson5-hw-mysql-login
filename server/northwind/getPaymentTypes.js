const express = require('express');
const router = express.Router();
const pool = require('../db/pool');


router.get('/', async (req, res, next) => {
     
    try{
        const result = await pool.execute(getPaymentTypesQuery());
        const [first] = result
        return res.json(first);
    } catch {
        return res.json("some error");
    }
})

function getPaymentTypesQuery() {
    return 'SELECT distinct(payment_type) FROM northwind.orders WHERE payment_type IS NOT NULL';
}

module.exports = router;