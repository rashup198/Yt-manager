const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASS,
            },
        });
        let info = await transporter.sendMail({
            from: 'YT-app || yt uploads made easy',
            to:`${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log(info);
        return info;
    }
    catch (err) {
        console.log(err);
    }   
}

module.exports = mailSender;
