const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRouter = require("./routes/auth");
const cors = require("cors");

const app = express();




app.use(cors());
app.use(bodyParser.json());


app.use("/auth", authRouter) 





app.listen(process.env.PORT, () => {
    console.log("Server is listening to port: " + process.env.PORT);
})