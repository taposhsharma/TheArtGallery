const nodemailer = require('nodemailer');


require('dotenv').config()
const transporter = nodemailer.createTransport({
    
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS:true,
    auth: {
        user: process.env.mail,
        pass: process.env.mailpass
        }
});


function createTableHtml(data) {
    let tableHtml = `<p>Email: ${data.email}</p>
    <p>
    Mobile No: ${data.mobile_no}</p>`

  
    return tableHtml;
  }


 const customizeMess=(details,email)=> {

 
    mailOptions = {
    from: '"The Art Gallery" <taposhsharma2002@gmail.com>',
    to: `${email}`,
    subject: 'Connection Request',
    html:   ` <p>Dear User,</p>
    <p>${details.firstname} ${details.lastnaem} wants to connect with you:</p>
    ${createTableHtml(details)}
    <p>Thank you!</p>`
};
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        return("send")
    }
});
}



module.exports = customizeMess
