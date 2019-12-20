const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRouter = require("./routes/auth");
const cors = require("cors");

const app = express();
const verify = require('./verify/verify')

const getCustomers = require('./northwind/getCustomers');
const getCustomer = require('./northwind/getCustomer');
const getCities = require('./northwind/getCities');
const getShips = require('./northwind/getShips');
const getOrders = require('./northwind/getOrders');
const getOrderByCity = require('./northwind/getOrdersByCity');

app.use(cors());
app.use(bodyParser.json());

app.use('/auth/changePassword', verify);
app.use("/auth", authRouter) 
app.use('/getOrders', getOrders);
app.use('/getCustomers', getCustomers);
app.use('/getCustomer', getCustomer);
app.use('/getCities', getCities);
app.use('/getShips', getShips);
app.use('/getOrderByCity', getOrderByCity);



app.listen(process.env.PORT, () => {
    console.log("Server is listening to port: " + process.env.PORT);
})