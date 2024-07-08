import {getBooks,addBooks} from '../controllers/book.js';
import express from "express"

const getBooks_router = express.Router()

getBooks_router.get('/getBooks',getBooks);
getBooks_router.post('/addBooks',addBooks);
export {getBooks_router}
