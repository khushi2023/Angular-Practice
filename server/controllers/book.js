// const book = require('../models/model.js');
import book from '../models/model.js'
import dbConnect from '../db/index.js';

//get all books
const getAllBooks = async (req, res) => {
    try {
        await dbConnect();
        console.log("Get Books");
        const books = await book.find({});
        res.send(books);
        console.log(books);
    }
    catch (err) {
        console.log(err);
    }
}

//Add a Book to db
const addBook = async (req, res) => {
    try {
        await dbConnect();

        const { name, author, description, price, quantity } = req.body;
        if (!name || !author || !description || !price || !quantity) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const newBook = new book({
            name,
            author,
            description,
            price,
            quantity
        });
        // Save the book to the database
        await newBook.save();
        // Respond with success message or the newly created book object
        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Failed to add book." });
    }
}

//get a particular book
const getBook = async (req, res) => {
    try {
        await dbConnect();
        const _id = await req.params.id;
        console.log(_id);
        const bookDetail = await book.findById(_id);
        console.log(bookDetail);
        if (!bookDetail) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(bookDetail);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
        console.log(err);
    }
}

//update a book
const updateBook = async (req, res) => {
    await dbConnect();
    const _id = req.params.id;
    const { name, author, description, price, quantity } = req.body;
    const bookDetail = await book.findById(_id);
    console.log(bookDetail);
    if (!bookDetail) {
        return res.status(404).json({ message: 'Book not found' });
    }
    bookDetail.name = name;
    bookDetail.author = author;
    bookDetail.description = description;
    bookDetail.price = price;
    bookDetail.quantity = quantity;

    //update the book to db
    await bookDetail.save();
    res.json(bookDetail);
}

//delete a book
const deleteBook = async (req, res) => {
    try {
        await dbConnect();
        const _id = req.params.id;
        console.log(_id);
        const bookDetail = await book.findByIdAndDelete(_id);
        if (!bookDetail) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
        console.log(err);
    }
}
export { getAllBooks, addBook, getBook, updateBook, deleteBook };