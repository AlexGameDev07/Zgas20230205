/**
 * Fields:
 * name
 * lastName
 * birthday (esto es de tipo Date o lo puden poner como String)
 * email
 * address
 * hireDate (esto es de tipo Date o lo puden poner como String)
 * password
 * telephone
 * dui
 * isssNumber
 * isVerified
 */

import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
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
      default: Date.now, // Valor por defecto: fecha actual
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    hireDate: {
      type: Date,
      default: Date.now, // Valor por defecto: fecha actual
    },
    password: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
    },
    dui: {
      type: String,
    },
    isssNumber: {
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

export default model("Employees", employeesSchema);
