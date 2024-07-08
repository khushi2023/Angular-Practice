// const book = require('../models/model.js');
import book from '../models/model.js'
import dbConnect from '../db/index.js';

const getAllBooks = async (req, res) => {
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

const addBook = async (req, res) => {
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

const getBook = async (req,res)=>{
    try{
        await dbConnect();
        const name = req.body.name;
        console.log(name);

        const bookDetail = await book.findOne({name:name});
        console.log(bookDetail);
        if (!bookDetail) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(bookDetail);
    }
    catch(err){
        res.status(500).json({ message: 'Server error' });
        console.log(err);
    }
}
export  {getAllBooks,addBook,getBook};