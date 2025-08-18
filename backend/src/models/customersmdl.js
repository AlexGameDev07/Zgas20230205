/**
 * Fields:
 * name
 * lastName
 * birthday
 * email
 * password
 * telephone
 * dui
 * isVerified,
 * loginAttempts
 * lockTime
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
    loginAttempts:{
      type: Number,
      default: 0
    },
    lockTime:{
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("customersmdl", customersSchema);
