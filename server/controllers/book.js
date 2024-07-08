// const book = require('../models/model.js');
import book from '../models/model.js'
import dbConnect from '../db/index.js';

const getBooks = async (req, res) => {
    try{
        await dbConnect();
    console.log("Get Books");
    const books = await book.find({});
    res.send(books);
    console.log(books);
    }
    catch(err){
        console.log(err);
    }
}

const addBooks = async (req, res) => {
    try {
        await dbConnect();

        const { name, author, description, price, quantity } = req.body;

        // Validate input
        if (!name || !author || !description || !price || !quantity) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // const db = client.db(dbName);
        // const collection = db.collection('bookshelves');
        // Create a new book instance
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
export  {getBooks,addBooks};