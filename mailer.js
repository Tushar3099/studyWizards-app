
const nodemailer = require("nodemailer");

async function main(email) {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "tavk017@gmail.com", 
      pass: "itsconfusing@123"
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
        }
  });

  let info = await transporter.sendMail({
    from: '"Tushar" <tavk017@gmail.com>', // sender address
    to: email , // list of receivers
    subject: "Login Verification", // Subject line
    text: "You have been successfully logged in?", // plain text body
    html: "<b>Successfull login?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
