import express from "express";
import movieEvent from "../moviemodel.js";

const router = express.Router();

router.post("/movieevents", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const events = await movieEvent.insertMany(req.body);
      res.status(201).json({
        message: `${events.length} Events created  successfully`,
        events,
      });
    } else {
      const event = new movieEvent(req.body);
      await event.save();
      res.status(201).json({
        message: `Event created`,
        event,
      });
    }
  } catch (error) {
    res.status(401).json({
      error: "Can't Create Events",
    });
  }
});

router.get("/movieevents", async (req, res) => {
  try {
    const events = await movieEvent.find().sort({ date: 1 });
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch" });
  }
});

export default router;
