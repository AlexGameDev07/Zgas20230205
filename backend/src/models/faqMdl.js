/**
 * Campos:
 * question
 * answer
 * level
 * isActive
 */

import { Schema, model } from "mongoose";

const faqSchema = new Schema({
    question: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        minlength: 5
    },
    answer: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
        minlength: 10
    },
    level: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 5,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Faq", faqSchema);