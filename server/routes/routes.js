import {getAllBooks,addBook,getBook} from '../controllers/book.js';
import express from "express"

const getBooks_router = express.Router()

getBooks_router.get('/getAllBooks',getAllBooks);
getBooks_router.post('/addBook',addBook);
getBooks_router.get('/getBook/:id',getBook);
export {getBooks_router}