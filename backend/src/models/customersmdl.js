/**
 * Fields:
 * name
 * lastName
 * birthday
 * email
 * password
 * telephone
 * dui
 * isVerified
 */

import { Schema, model } from "mongoose";

const customersSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    telephone: {
      type: String,
    },
    dui: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Customers", customersSchema);
