const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post('/',(req, res, next) =>{
    const { authorization } = req.headers;
    if (!authorization) return res.json({message: "Verification failed", redirect: false});
    console.log("req.headers-stringify===>> " + JSON.stringify(req.headers))
    console.log("authorization=>>", authorization)
    
    jwt.verify(authorization, process.env.SECRET, (err, decoded) =>{
        if (err) res.json({message: "Verification failed", redirect: false});
        console.log("deco", decoded);
        //return res.json({message: "Verification succeed", redirect: true});
        req.decoded = decoded;
        next()
        })
    
  })




  
  module.exports = router;