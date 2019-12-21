const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRouter = require("./routes/auth");
const cors = require("cors");

const app = express();
const verify = require('./verify/verify')


const getCustomer = require('./northwind/getCustomer');
const getShips = require('./northwind/getShips');
const getOrders = require('./northwind/getOrders');
const getOrderByCity = require('./northwind/getOrdersByCity');
const getPaymentTypes = require('./northwind/getPaymentTypes');



app.use(cors());
app.use(bodyParser.json());

//app.use('/auth/changePassword', verify);
app.use("/auth", authRouter) 

app.use('/getOrders', getOrders);
app.use('/getShips', getShips);
app.use('/getPaymentTypes', getPaymentTypes);

app.use('/getOrderByCity', getOrderByCity);


app.use('/getCustomer', getCustomer);


app.listen(process.env.PORT, () => {
    console.log("Server is listening to port: " + process.env.PORT);
})