const nodemailer = require('nodemailer');
module.exports = {
 sendEmail: function(to, subject, text, html) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'antoinekucher00@gmail.com',
      pass: 'qteretere12345',
    }
  });
  transporter.verify(function(error, success) {
    console.log('Verify connection');
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  const mailOptions = {
    from: 'antoinekucher00@gmail.com',
    to: to,
    subject: subject,
    text: text,
    html: html
  };
  console.log(html);
  console.log('HERE WE ARE');
  console.log(mailOptions);
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(info);
      console.warn('PROBLEM IS HERE');
    }else{
      console.log("DID IT");
      console.log(info);
    }
  });
}
}



