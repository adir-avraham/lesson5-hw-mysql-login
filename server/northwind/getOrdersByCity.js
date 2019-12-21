const express = require("express");
const router = express.Router();
const pool = require("../db/pool");
const verify = require('../verify/verify');


router.use('/', verify);

router.post("/", async (req, res, next) => {
    const {  shipCity, paymentType } = req.body;
    console.log(shipCity, paymentType)
    if (!shipCity && !paymentType) return res.json({message: "no parames selected"})
    if (shipCity && paymentType) {
        try {
        const [result] = await pool.execute(getOrderQuery(), [shipCity, paymentType]) 
        return res.json({filteredData: result, redirect: true} );
    } catch {
        return res.json("some error")
    }
} else {
    try{
        const payload = shipCity ? [shipCity] : [paymentType];
        const query = shipCity ? getOrdersByCityQuery() : getOrdesByPaymentQuery();
        const [result] = await pool.execute(query, payload);
        return res.json({filteredData: result, redirect: true}) 
    }  catch {
    return res.json("some error")
}
}

});


module.exports = router;


function getOrderQuery() {
    return 'SELECT id, ship_name, ship_address, ship_city, ship_country_region, shipping_fee, payment_type FROM orders WHERE ship_city= ? AND payment_type= ?'
}

function getOrdersByCityQuery() {
    return 'SELECT id, ship_name, ship_address, ship_city, ship_country_region, shipping_fee, payment_type FROM orders WHERE ship_city= ?'
}

function getOrdesByPaymentQuery() {
    return 'SELECT id, ship_name, ship_address, ship_city, ship_country_region, shipping_fee, payment_type FROM orders WHERE payment_type= ?'
}





