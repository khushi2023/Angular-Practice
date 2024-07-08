import mongoose from "mongoose";
// import dbConnect from "../db/index.js";

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true}
});
const Book = mongoose.model('bookshelves', bookSchema);

export default Book;