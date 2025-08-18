import express from "express";
import users from "../usermodel.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  try {
    const oldUser = await users.findOne({ email });
    if (oldUser)
      return res.status(409).json({ message: "Account already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
    });
    res.status(201).json({
      message: "Account created Successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        phoneNumber: newUser.phoneNumber,
        lastName: newUser.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create account" });
  }
});

export default router;
