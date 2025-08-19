import express from "express";
import cors from "cors";
import connectDB from "./config.js";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";

import verifypay from "./router/payverify.js";

import pay from "./payment.js";
import football from "./events/football.js";
import bash from "./events/bash.js";
import movies from "./events/movies.js";
import music from "./events/music.js";
import email from "./router/email.js";
import login from "./router/login.js";
import signup from "./router/signup.js";
import authuser from "./router/auth.js";
import logout from "./router/logout.js";
import ticket from "./router/ticket.js";
import userstat from "./router/userstat.js";
import admin from "./router/admin.js";
import totalevents from "./router/totalevents.js";
import totaluser from "./router/totaluser.js";
import totalticket from "./router/totalticket.js";
import upcomingevents from "./router/upcomingevent.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "https://eventhub-eight-gamma.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api", football);
app.use("/api", bash);
app.use("/api", movies);
app.use("/api", music);
app.use("/api", email);
app.use("/api", login);
app.use("/api", signup);
app.use("/api", authuser);
app.use("/api", logout);
app.use("/api", ticket);
app.use("/api", userstat);
app.use("/api", admin);
app.use("/api", totalevents);
app.use("/api", totaluser);
app.use("/api", totalticket);
app.use("/api", upcomingevents);
app.use("/api", pay);
app.use("/api", verifypay);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
