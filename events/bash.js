import express from "express";
import bashPartyEvent from "../bashmodel.js";

const router = express.Router();

router.post("/bashpartyevents", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const events = await bashPartyEvent.insertMany(req.body);
      res.status(201).json({
        message: `${events.length} Events created successffuly`,
        events,
      });
    } else {
      const event = new bashPartyEvent(req.body);
      await event.save();
      res.status(201).json({
        message: "Event created",
        event,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Can't create Events",
      details: error.message,
    });
  }
});

router.get("/bashpartyevents", async (req, res) => {
  try {
    const events = await bashPartyEvent.find().sort({ date: 1 });
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;
