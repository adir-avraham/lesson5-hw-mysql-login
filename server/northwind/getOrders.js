const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const verify = require('../verify/verify');


router.use('/', verify);

router.post('/', async (req, res, next) => {

    try{
        const result = await pool.execute(getOrders())
        return res.json({orders: result, redirect: true});
    } catch {
        res.json("error with orders");
    }
})

function getOrders () {
    return 'SELECT id, ship_name, ship_address, ship_city, ship_country_region, shipping_fee, payment_type FROM orders WHERE payment_type IS NOT NULL';
}

module.exports = router;