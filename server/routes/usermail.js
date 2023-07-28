const nodemailer = require("nodemailer");

require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.mail,
    pass: process.env.mailpass,
  },
});

const customizeUser = (email) => {
  mailOptions = {
    from: '"The Art Gallery" <taposhsharma2002@gmail.com>',
    to: `${email}`,
    subject: "Successfully Signup",
    html: ` <p>Welcome User,</p>
    <p>You successfully joined.</p>
    
    <p>Thank you!</p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = customizeUser;
