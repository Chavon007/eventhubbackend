import express from "express";
import jwt from "jsonwebtoken";
import ticketmodel from "../ticketmodel.js";
import axios from "axios";

const router = express.Router();

router.get("/pay/verify", async (req, res) => {
  try {
    const reference = req.query.reference;
    const verifyRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentData = verifyRes.data.data;
    if (paymentData.status === "success") {
      const token = req.cookies.token;

      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const ticket = new ticketmodel({
          eventId: req.query.eventId,
          eventModel: req.query.eventModel,
          userId: decoded.id,
          quantity: req.query.quantity || 1,
        });
        await ticket.save();
      }
      return res.redirect("http://localhost:3000/home.html");
    } else {
      return res.redirect("http://localhost:3000/event.html");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
