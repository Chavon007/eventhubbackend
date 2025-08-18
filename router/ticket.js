import express from "express";
import ticketmodel from "../ticketmodel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/ticket", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const ticket = new ticketmodel({
      eventId: req.body.eventId,
      eventModel: req.body.eventModel,
      userId: decoded.id,
      quantity: req.body.quantity,
    });
    await ticket.save();
    res.status(200).json({ ticket });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/ticket", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const tickets = await ticketmodel.find({ userId: decoded.id });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
