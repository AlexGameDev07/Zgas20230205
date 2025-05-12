/**
 * Campos:
 * title: String
 * content: String
 * image: String
 */

import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 3,
        maxLength: 100,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 1000,
    },
    image: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 1000,
    }
},
{
    timestamps: true,
    strict: false,
}
);
const Blog = model("Blog", blogSchema);
export default Blog;