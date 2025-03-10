import express from "express";
import mongoose from 'mongoose';
import { PORT } from "./config.js";
import { Book } from './models/bookmodel.js';
import BooksRoute from './routes/BooksRoute.js';
import AuthRoute from "./routes/AuthRoute.js";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());//allow all orgins with default cors(*)

app.use("/auth", AuthRoute);
app.use('/books', BooksRoute);

mongoose
    .connect(process.env.MONGOURL)
    .then(()=>{
      console.log("App connected to database");
      app.listen(PORT, ()=>{
        console.log(`App is listen to port: ${PORT}`);
      });
})
.catch((err)=>{
    console.log(err)
});

