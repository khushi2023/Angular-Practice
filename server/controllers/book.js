// const book = require('../models/model.js');
import book from '../models/model.js'
import dbConnect from '../db/index.js';
const getBooks = async (req, res) => {
    try{await dbConnect();
    console.log("Get Books");
    const books = await book.find({});
    res.status(200).send(books);
    console.log(books);}
    catch(err){
        console.log(err);
    }
}
export default getBooks;