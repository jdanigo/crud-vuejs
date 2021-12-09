import mongoose from "mongoose";
const schema = mongoose.Schema;
const productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default: ''
    },
    price: {
        type: Number,
        required: true
    },
    review: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        required: false,
        default: Date.now()
    },
});
const productsModel = mongoose.model("products", productSchema);
export { productsModel };