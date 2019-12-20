const express = require('express');
const router = express.Router();
const pool = require('../db/pool')


router.get('/', async (req, res, next)=>{

    try {
        const result = await pool.execute(getCustomersQuery())
        return res.json(result);
    } catch {
        return res.json("some error");
    }
})

function getCustomersQuery () {
    return "select * from customers"
}


module.exports = router;