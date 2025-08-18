import express from "express";

import ticketmodel from "../ticketmodel.js";
const router = express.Router();

router.get("/totalticket", async (req, res) => {
  try {
    const totalticket = await ticketmodel.countDocuments();
    res.json({
      totalticket,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
});
export default router;
