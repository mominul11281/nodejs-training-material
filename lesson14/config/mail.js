const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "your_own_user_id",
      pass: "your_own_password"
    }
});


const sendMail = async (mailOptions) => {
    try {
        const mail = await transport.sendMail(mailOptions);
        console.log("Email sent: ", mail.response);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMail;