import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import adminmodel from "../adminmodel.js";
import authenticateAdmin from "../proute.js";

const router = express.Router();

router.post("/admindashboard", async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await adminmodel.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
     return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/admindashboard", authenticateAdmin, (req, res) => {
  res.json({ message: "Admin dashboard" });
});

export default router;
