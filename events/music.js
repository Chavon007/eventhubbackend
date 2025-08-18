import express from "express";

import musicEvents from "../musicmodel.js";

const router = express.Router();

router.post("/musicevents", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const events = await musicEvents.insertMany(req.body);
      res.status(201).json({
        message: `${events.length} Event created successfully`,
        events,
      });
    } else {
      const event = new musicEvents(req.body);
      await event.save();
      res.status(201).json({
        message: `Event created`,
        event,
      });
    }
  } catch (error) {
    res.status(401).json({ error: `Failed to create events` });
  }
});

router.get("/musicevents", async (req, res) => {
  try {
    const events = await musicEvents.find().sort({ date: 1 });
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: `Failed To Fetch Events` });
  }
});

export default router;
