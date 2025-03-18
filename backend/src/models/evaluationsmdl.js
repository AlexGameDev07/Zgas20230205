/**
 * Comment
 * Grade
 * Role
 * IdEmployee
 */

import { Schema, model } from "mongoose";

const evaluationsSchema = new Schema({
   comment: {
      type: String,
      required: true
   },
   grade: {
      type: Number,
      min: 1,
      max: 5,
      required: true
   },
   role: {
      type: String,
      required: true
   },
   idEmployee: {
      type: Schema.Types.ObjectId,
      ref: "Employees"
   }
},
   {
      timestamps: true,
      strict: false
   })

export default model("evaluationsmdl", evaluationsSchema);
