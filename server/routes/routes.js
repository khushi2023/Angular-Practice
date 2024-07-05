import getBooks from '../controllers/book.js';
import express from "express"

const getBooks_router = express.Router()

getBooks_router.get('/getBooks',getBooks);

export {getBooks_router}
