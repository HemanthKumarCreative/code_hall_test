const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

const sendMail = async (fromUser, toUser, subject, text, res) => {
  try {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: fromUser,
        pass: "vnnw lkvz kafl getn",
      },
    });

    // Define the email content
    const mailOptions = {
      from: fromUser,
      to: toUser, // Recipient's email address
      subject,
      text,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error("Error:", error);
      }
      res.status(200).json({ message: info.response });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkMail = async (fromUser, toUser, subject, text, res) => {
  try {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: "localhost", // MailHog SMTP server
      port: 8025, // Default MailHog SMTP port
    });

    // Define the email content
    const mailOptions = {
      from: fromUser,
      to: toUser, // Recipient's email address
      subject,
      text,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      console.log(error);
      if (error) {
        return console.error("Error:", error);
      }
      res.status(200).json({ message: info.response });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

app.use(express.json());

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;
  const fromUser = "avisihks@gmail.com";
  checkMail(fromUser, to, subject, text, res);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
