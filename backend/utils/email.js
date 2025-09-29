const nodemailer = require("nodemailer");

require("dotenv").config();

const sendEmail = async function (options) {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }

    })

    // 2) Define email options
    const mailOptions = {
        from: "sai kumar <saikumar248123@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html:
    }

    // 3) Send the mail
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;