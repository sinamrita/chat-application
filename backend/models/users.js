const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"]
    },
    profile: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const users = model("user", userSchema);

module.exports = users;
