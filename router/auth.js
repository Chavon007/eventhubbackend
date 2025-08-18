import express from "express";

import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ user: decoded });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
});

export default router;
