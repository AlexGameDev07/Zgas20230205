/**
 * Product
 * Category
 * Customer
 * Total
 */

import {Schema, model} from 'mongoose';
const salesSchema = new Schema({
    product: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
},{
    timestamps: true,
    strict: false
});

const SalesMdl = model('Sales', salesSchema);
export default SalesMdl;