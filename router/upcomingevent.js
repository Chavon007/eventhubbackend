import express from "express";
import bashPartyEvent from "../bashmodel.js";
import footballEvents from "../model.js";
import movieEvent from "../moviemodel.js";
import musicEvents from "../musicmodel.js";

const router = express.Router();

router.get("/upcomingevents", async (req, res) => {
  try {
    const now = new Date();
    const music = await musicEvents.find({ date: { $gte: now } });
    const movie = await movieEvent.find({ date: { $gte: now } });
    const football = await footballEvents.find({ date: { $gte: now } });
    const bash = await bashPartyEvent.find({ date: { $gte: now } });

    let allEvents = [...bash, ...movie, ...music, ...football];

    allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    const top4 = allEvents.slice(0, 5);

    const top10 = allEvents.slice(0, 10);

    res.json({ top4, top10 });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
