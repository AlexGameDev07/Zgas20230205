/**
 * Comment
 * Rating
 * IdClient
 */

import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
   comment: {
      type: String,
      required: true
   },
   rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
   },
   idClient: {
      type: Schema.Types.ObjectId,
      ref: "customersmdl",
      required: true
   }
},
   {
      timestamps: true,
      strict: false
   })

export default model("reviewsmdl", reviewSchema);
