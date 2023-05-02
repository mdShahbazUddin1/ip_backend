const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { logger } = require("./middleware/logger");
const { cityIp } = require("./routes/ip.routes");
const { auth } = require("./middleware/auth");
require("dotenv").config()


const app = express();
app.use(express.json())

app.use("/user",userRouter)
app.use(auth)
app.use("/city",cityIp)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("db connected")
        logger.log("info","Database connected")
    } catch (error) {
        console.log(error)
        logger.log("info", "Database connection failed");
    }
    console.log("server is running")
})