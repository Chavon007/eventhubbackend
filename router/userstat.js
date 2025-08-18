import express from "express";
import jwt from "jsonwebtoken";
import ticketmodel from "../ticketmodel.js";

import bashPartyEvent from "../bashmodel.js";
import footballEvents from "../model.js";
import movieEvent from "../moviemodel.js";
import musicEvents from "../musicmodel.js";

const router = express.Router();

const allEvents = {
  bashPartyEvents: bashPartyEvent,
  football: footballEvents,
  movie: movieEvent,
  music: musicEvents,
};

router.get("/userstat", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const tickets = await ticketmodel.find({
      userId: userId,
    });

    let eventsAttended = 0;
    let totalSpent = 0;
    let upcomingEvents = 0;

    let recentTicket = [];
    let pastEvent = [];

    const now = new Date();

    for (const ticket of tickets) {
      const modelName = ticket.eventModel;
      const eventId = ticket.eventId;

      const EventModel = allEvents[modelName];
      if (!EventModel) continue;

      const event = await EventModel.findById(eventId);
      if (!event) continue;

      totalSpent += event.price || 0;

      if (ticket.attended) eventsAttended++;
      if (new Date(event.date) > now) upcomingEvents++;

      recentTicket.push({
        eventName: event.title,
        eventType: modelName,
        date: event.date,
        price: event.price,
      });

      if (new Date(event.date) < now) {
        pastEvent.push({
          eventName: event.title,
          eventType: modelName,
          date: event.date,
          location: event.venue || event.veune,
        });
      }
    }
    res.json({
      ticketsPurchased: tickets.length,
      eventsAttended,
      totalSpent,
      upcomingEvents,
      recentTicket: recentTicket.slice(0, 5),
      pastEvent: pastEvent.slice(0, 5),
      recentActivity: [],
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
