import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { getAllBooks, insertBook, updateBook, deleteBook, filterByGenre, filterByAuthor } from "./controllers/book.js";
import { insertMember } from "./controllers/member.js";
import { insertBorrowedBook, getAllBorrowedBooks, returnBook } from "./controllers/borrowBook.js";
/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

/* ROUTES */
app.post("/book/insertBook", insertBook)
app.get("/book/getAllBooks", getAllBooks)
app.post("/book/updateBook", updateBook)
app.post("/book/deleteBook", deleteBook)
app.post("/book/filterByGenre", filterByGenre)
app.post("/book/filterByAuthor", filterByAuthor)

app.post("/member/insertMember", insertMember)

app.post("/borrowedBook/insertBook", insertBorrowedBook)
app.get("/borrowedBook/getAllBooks", getAllBorrowedBooks)
app.post("/borrowedBook/returnBook", returnBook)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8081;
mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`))