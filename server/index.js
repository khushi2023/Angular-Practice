import express from "express"
import cors from 'cors'
import dbConnect from "./db/index.js";

import {getBooks_router} from './routes/routes.js'
const app=express();

app.use(cors());
app.use(express.json());
// dbConnect();
app.use(getBooks_router)

app.listen(5000,()=>{
    console.log("server started");
})