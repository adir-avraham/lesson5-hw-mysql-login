const express = require("express");
const router = express.Router();
const pool = require("../db/pool");


router.post("/", async (req, res, next) => {
    const [query, params] = getCustomerQuery(req.body)

    try {
        const result = await pool.execute(query, params) 
        const [first] = result
        return res.json(first);
    } catch {
        return res.json("some error")
    }

});

function getCustomerQuery(params) {
    return ['SELECT first_name, last_name, job_title, address, city, country_region FROM customers WHERE first_name= ? OR last_name= ?', [...Object.values(params)] ]
}


module.exports = router;