import express from "express";
import users from "./usermodel.js";
import axios from "axios";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/pay", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await users.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { amount, eventId, eventModel, quantity } = req.body;
    const koboAmount = amount * 100;

    const payStackRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: user.email,
        amount: koboAmount,
        callback_url: `http://localhost:5000/api/pay/verify?eventId=${eventId}&eventModel=${eventModel}&quantity=${quantity}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(payStackRes.data.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
