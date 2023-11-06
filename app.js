const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors"); // Import the cors module

const checkMail = async (fromUser, toUser, subject, text, res) => {
  try {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      type: "smtp",
      host: "localhost", // MailHog SMTP server
      port: 1025, // Default MailHog SMTP port
      security: false,
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
      res.status(201).json({ message: info.response });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

app.use(cors());
app.use(express.json());

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;
  const fromUser = "avisihks@gmail.com";
  checkMail(fromUser, to, subject, text, res);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
