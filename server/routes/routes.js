import {getAllBooks,addBook,getBook,updateBook,deleteBook} from '../controllers/book.js';
import express from "express"

const getBooks_router = express.Router()

getBooks_router.get('/getAllBooks',getAllBooks);
getBooks_router.post('/addBook',addBook);
getBooks_router.get('/getBook/:id',getBook);
getBooks_router.put('/updateBook/:id',updateBook);
getBooks_router.delete('/deleteBook/:id',deleteBook);

export {getBooks_router}