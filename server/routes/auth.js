const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");
const bcrypt = require('bcryptjs'); 
const salt = "$2a$10$AQpgdFhYR3oM0RBIP4f6pu"
//const salt = bcrypt.genSaltSync(10);
//to fix it (for dynamic salt) => save the salt in another column on mysql
const verify = require('../verify/verify')

router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await isUserExist(email, password);
        if (!user) return res.json({message: "Incorrect user name / password", redirect: false});
        const jwtToken = await getJwt({ ...user, password: null });
        return res.json({ message: "User logged in", token: jwtToken, redirect: true, user: user });
    } catch (ex) {
        console.log(ex);
        if (!user) return res.status(401).send("ERROR LOGIN");
    }
    
})



router.post("/register", async (req, res, next) => {
    const { email, password } = req.body;
    const user = await isUserExist(email);
    if (user) return res.json({ message: "User already exist" });
    const insertId = await saveUser(req.body);
    if (insertId) return res.json({ message: "Your registration was successful!", redirect: true, insertId });
    return res.json({ message: "register error!" });  
})


//router.use('/', verify)

router.post('/changePassword', async (req, res, next) =>{  
    try {
        const {newPassword, passwordConfirm, userId} = req.body;
        if (newPassword !== passwordConfirm) return res.json({message: `No match password confirm`, redirect: false });
        const result = await updatePassword(newPassword, userId); 
        if (!result) return res.json({message: `Update password failed`, redirect: false });
        return res.json({message: `password updated`, redirect: true }); 
    } catch {
        if (!result) return res.json({message: `Update password failed`, redirect: false })
    }
})



module.exports = router;



function getJwt(p) {
    return new Promise((resolve, reject) => {
        jwt.sign(p, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) reject("error");
            resolve(token);
        })
    })
}


async function isUserExist(email, password = null) {
    const payload = password ? [email, bcrypt.hashSync(password, salt)] : [email];
    const query = password ? getUserPasswordExistQuery() : getUserExistQuery();
    const [result] = await pool.execute(query, payload);
    const [firstUser] = result;
    return firstUser;
}


async function saveUser(payload) {
    const { email, password, firstName = null, lastName = null } = payload;
    const [result] = await pool.execute(getUserInsertionQuery(), [email, bcrypt.hashSync(password, salt), firstName, lastName]);
    return result.insertId;
}

async function updatePassword(newPassword, userId) {
    const [result] = await pool.execute(getUpdatePasswordQuery(), [bcrypt.hashSync(newPassword, salt), userId]);
    return result.affectedRows;
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

function getUpdatePasswordQuery() {
    return "UPDATE northwind.users SET password = ? WHERE northwind.users.id = ?";
}



