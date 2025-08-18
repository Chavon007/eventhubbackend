import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "eventModel",
  },

  eventModel: {
    type: String,
    required: true,
    enum: ["musicevent", "movieevents", "footballEvents", "bashPartyEvents"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

ticketSchema.index({ userId: 1 });
ticketSchema.index({ eventId: 1 });

export default mongoose.model("ticket", ticketSchema);
