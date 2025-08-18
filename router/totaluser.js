import express from "express";

import users from "../usermodel.js";
import ticketmodel from "../ticketmodel.js";

const router = express.Router();

router.get("/totaluser", async (req, res) => {
  try {
    const totaluser = await users.countDocuments();

    const userDetials = await users.find(
      {},
      "firstName lastName email phoneNumber  createdAt"
    );

    const userData = [];

    for (const user of userDetials) {
      const ticket = await ticketmodel.find({ user: user._id });
      const eventsAttended = ticket.filter((t) => t.attended).length;

      userData.push({
        name: `${user.firstName} ${user.lastName}`,
        phone: user.phoneNumber,
        email: user.email,
        joined: user.createdAt,
        eventsAttended,
      });
    }

    res.json({
      totaluser,
      user: userData,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
export default router;
