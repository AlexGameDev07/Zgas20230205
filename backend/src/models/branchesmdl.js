/**
 * Fields:
 * name
 * address
 * telephone
 * schedule
 */

import { Schema, model } from "mongoose";

const branchesSchema = new Schema(
     {
          name: {
               type: String,
               require: true,
          },
          address: {
               type: String,
          },
          telephone: {
               type: String,
          },
          schedule: {
               type: String,
          },
     },
     {
          timestamps: true,
          strict: false,
     }
);

export default model("Branches", branchesSchema);
