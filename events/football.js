import express from "express";
import footballEvents from "../model.js";

const router = express.Router();

router.post("/footballevents", async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const events = await footballEvents.insertMany(req.body);
      res.status(201).json({ 
        message: `${events.length} events created successfully`, 
        events 
      });
    } else {
      const event = new footballEvents(req.body);
      await event.save();
      res.status(201).json({ 
        message: "Event created successfully", 
        event 
      });
    }
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(400).json({ 
      error: "Can't create events", 
      details: error.message 
    });
  }
});

router.get("/footballevents", async (req, res) => {
  try {
    const events = await footballEvents.find().sort({ date: 1 });
    res.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

export default router;