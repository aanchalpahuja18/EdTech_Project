const express = require("express");
const app = express();


const cookieParser = require("cookie-parser");
require("dotenv").config();
const router = require("./routes/route");
const dbConnect = require("./config/database");
const cloudinaryConnect = require("./config/cloudinary");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 4000;

//middlewares: 

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

//router setup:
//TODO: Create separate route files and then mount them separately
app.use("/api/v1", router)

//db connection:
dbConnect();

//cloudinary connection:
cloudinaryConnect();

//default route:
app.get("/", (req, res) => {
    res.send(`<h1>Welcome to EdTech Platform</h1>`)
    return res.status(200).json({
        success: true,
        message: "Your server is up and running.."
    })
})

//server activated
app.listen(PORT, () => {
    console.log(`App is listening at PORT ${PORT}`)
})