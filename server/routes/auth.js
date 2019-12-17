const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");
const bcrypt = require('bcryptjs'); 
const salt = bcrypt.genSaltSync(10);



router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await isUserExist(email, password);
        if (!user) return res.status(401).send("ERROR LOGIN") // change to general error
        const jwtToken = await getJwt({ ...user, password: null })
        return res.json({ message: "user logged in", token: jwtToken })
    } catch (ex) {
        console.log(ex)
        if (!user) return res.status(401).send("ERROR LOGIN")
    }
    
})



router.post("/register", async (req, res, next) => {
    const { email, password } = req.body
    const user = await isUserExist(email);
    if (user) return res.json({ message: "User already exist" });
    const insertId = await saveUser(req.body);
    console.log("after save " + insertId)
    if (insertId) return res.json({ message: "User saved!" });
    return res.json({ message: "error!" })  
})


module.exports = router;



function getJwt(p) {
    return new Promise((resolve, reject) => {
        jwt.sign(p, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) reject("error")
            resolve(token)
        })
    })
}



async function isUserExist(email, password = null) {
    const payload = password ? [email, bcrypt.hashSync(password, salt)] : [email];
    const query = password ? getUserPasswordExistQuery() : getUserExistQuery();
    const [result] = await pool.execute(query, payload)
    const [firstUser] = result;
    return firstUser;
}


async function saveUser(payload) {
    const { email, password, firstName = null, lastName = null } = payload
    const [result] = await pool.execute(getUserInsertionQuery(), [email, bcrypt.hashSync(password, salt), firstName, lastName])
    return result.insertId
}

function getUserExistQuery() {
    return "SELECT * FROM `northwind`.`users` WHERE email = ?";
}

function getUserPasswordExistQuery() {
    return "SELECT * FROM `northwind`.`users` WHERE email = ? AND password = ?";
}
function getUserInsertionQuery() {
    return "INSERT INTO `northwind`.`users` (`email`, `password`, `first_name`, `last_name`) VALUES (?,?,?,?)";

}