import express from "express";
import { sendMail } from "../emailserver.js";

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { name, subject, message, email } = req.body;
  try {
    await sendMail({ name, subject, message, email });
    res.status(201).json({ message: "message sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Email failed to send" });
  }
});

export default router;
