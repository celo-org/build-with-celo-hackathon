const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

async function sendMail(email, subject, payload, template) {
  try {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    
    const options = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };

    // Send email
    await transporter.sendMail(options);

  } catch (error) {
    console.log(error)
    return error;
  }
};


module.exports = { sendMail };