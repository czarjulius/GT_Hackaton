const nodemailer = require("nodemailer");
require("dotenv").config();

class EmailController {
  static async pushEmail(infoBody) {
    const { email, password, instruction } = infoBody;
    console.log(infoBody, "email");

    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "kolawole.ridwan152@gmail.com",
        pass: "hackaton@gtb123"
      }
    });

    let mailOptions = {
      from: "kolawole.ridwan152@gmail.com",
      to: email,
      subject: "HR",
      html: `
        <h5> Kindly use the Email and password below to log in </h5>
        <ul>
        <li> User Name: ${email} </li>
        <li> Password:${password} </li>
        </ul>
        <h5>
        Kindly fill the following forms
        </h5>
        <p> ${instruction} </p>
      `
    };

    const delivered = await transporter
      .sendMail(mailOptions)
      .then(function(response) {
        console.log("Email Sent Successfully");
      })
      .catch(function(error) {
        console.log("Something Went Wrong", error);
      });
  }
}

export default EmailController;
