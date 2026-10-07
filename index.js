const express = require("express");
const app = express();

require("dotenv").config();

//middlewares: 
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//router setup:
const router = require("./routes/route");
app.use("/app/v1", router)

//db connection:
const dbConnect = require("./config/database");
dbConnect();

//server started
app.listen(process.env.PORT, (req, res) => {
    console.log(`App is listening!`)
})

//default route:
app.get("/", (req, res) => {
    res.send(`<h1>Welcome to EdTech Platform</h1>`)
})