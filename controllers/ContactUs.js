const mailSender = require("../utils/mailSender");

async function contact(req, res) {
    try{
        //fetch data:
        const {firstName, lastName, email, contactNumber, message} = req.body;

        //validate:
        if(!firstName || !lastName || !email ||!contactNumber || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields"
            })
        }

        //send mail to edtech: 

        await mailSender("aanchalpahuja34@gmail.com", "New message from Edtech", 
            `<h2>${firstName} ${lastName} sent a message</h2>
            <p>${message}</p>
            <p>You can contact them via ${contactNumber} or ${email}</p>
            `)

        //send mail to the student:

        await mailSender(email, "Message sent to EdTech", 
            `<p>Dear ${firstName} ${lastName}, your message was sent successfully to EdTech</p>
            <p>Please wait for their response</p>`)

        return res.status(200).json({
            success: true,
            message: "Contact request was successful"
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}