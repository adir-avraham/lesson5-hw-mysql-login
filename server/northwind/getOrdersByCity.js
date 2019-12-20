const express = require("express");
const router = express.Router();
const pool = require("../db/pool");


router.post("/", async (req, res, next) => {
    const [query, params] = getOrderQuery(req.body)

    try {
        const result = await pool.execute(query, params) 
        const [first] = result
        return res.json(first);
    } catch {
        return res.json("some error")
    }

});

function getOrderQuery(params) {
    return ['SELECT id, ship_name, ship_address, ship_city, ship_country_region, shipping_fee, payment_type FROM orders WHERE ship_city= ?', [...Object.values(params)] ]
}


module.exports = router;