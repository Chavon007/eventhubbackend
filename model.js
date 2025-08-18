import mongoose from "mongoose";

const footballSchema = new mongoose.Schema({
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
  time: {
    type: String,
    required: true,
  },
  vip:{
        type: Number,
        required: true,
    },
    regular:{
        type: Number,
        required: true
    },
  teams: {
    type: [String],
    required: true,
  },
  venue: {
    type: String,
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

const footballEvents = mongoose.model("footballEvents", footballSchema);
export default footballEvents;
