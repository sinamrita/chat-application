const { Schema, model, Types } = require("mongoose");

const messageSchema = new Schema(
  {
    sender_id: {
      type: Types.ObjectId,
      ref: "user",
      required: true
    },
    receiver_id: {
      type: Types.ObjectId,
      ref: "user",
      required: true
    },
    message: {
      type: String,
      required: true
    },
    seen: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const messages = model("message", messageSchema);

module.exports = messages;
