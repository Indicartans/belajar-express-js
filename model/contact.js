import mongoose from "mongoose";

export const Contact = mongoose.model("Contact", {
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  noTelp: {
    type: String,
    required: true,
  },
});