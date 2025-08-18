import express from "express";

import footballEvents from "../model.js";
import movieEvent from "../moviemodel.js";
import musicEvents from "../musicmodel.js";
import bashPartyEvent from "../bashmodel.js";

const router = express.Router();

router.get("/totalevents", async (req, res) => {
  try {
    const footballCount = await footballEvents.countDocuments();
    const musicCount = await musicEvents.countDocuments();
    const movieCount = await movieEvent.countDocuments();
    const bashCount = await bashPartyEvent.countDocuments();

    const totalEvents = footballCount + musicCount + movieCount + bashCount;

    res.json({
      music: musicCount,
      movie: movieCount,
      football: footballCount,
      bash: bashCount,
      totalEvents,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
