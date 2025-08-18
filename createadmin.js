import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import adminmodel from "./adminmodel.js";

const username = "chavon";
const password = "salvationenyioma";

async function createAdmin() {
  try {
    await mongoose.connect(
      "mongodb+srv://chavon:chavon@cluster0.p6vokci.mongodb.net/eventhub"
    );
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new adminmodel({
      username: username,
      password: hashedPassword,
    });
    await admin.save();
  } catch (err) {
    console.error("Error creating an admin", err);
  } finally {
    mongoose.disconnect();
  }
}
createAdmin();
