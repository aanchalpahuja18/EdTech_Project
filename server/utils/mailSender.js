const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendMail(email, title, body) {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })

        let info = await transporter.sendMail({
            from: 'EdTech - Aanchal Pahuja',
            to: email,
            subject: title,
            html: body
        })

        console.log("Info of mail: ", info);
        return info;
    } catch(err){
        console.log(err.message);
    }
}

module.exports = sendMail;