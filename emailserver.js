import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export let sendMail = async ({ name, email, subject, message }) => {
  let mailOption = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    replyTo: email,
    subject: `New message from ${name}: ${subject}`,
    text: message,
  };

  await transporter.sendMail(mailOption);
};
