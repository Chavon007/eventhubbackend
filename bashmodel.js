import mongoose from "mongoose";

const bashPartySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  veune: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  dress: {
    type: String,
    required: true,
  },
  ticket: {
    type: Number,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bashPartyEvent = mongoose.model("bashPartyEvents", bashPartySchema);
export default bashPartyEvent;
