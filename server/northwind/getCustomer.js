const express = require("express");
const router = express.Router();
const pool = require("../db/pool");
const verify = require('../verify/verify');

router.use('/', verify);

router.post("/", async (req, res, next) => {
    const [query, params] = getCustomerQuery(req.body)
    if (!params.length) return;
    try {
        const result = await pool.execute(query, params) 
        const [first] = result
        return res.json({customer: first, redirect: true});
    } catch {
        return res.json({message: "some error from customer", redirect: false})
    }

});

function getCustomerQuery(params) {
    return ['SELECT first_name, last_name, job_title, address, city, country_region FROM customers WHERE first_name= ? OR last_name= ?', [...Object.values(params)] ]
}


module.exports = router;