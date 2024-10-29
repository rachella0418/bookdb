import BorrowedBook from "../models/borrowedBookModel.js";
import Book from "../models/bookModel.js";
import Member from "../models/memberModel.js";

export const insertBorrowedBook = async (req, res) => {
    try {
        console.log(req.body.newBorrowEntry.memberEmail)
        
        const member = await Member.findById(req.body.newBorrowEntry.memberEmail)
        if (!member) {
            res.status(400).json("Member does not exist!");
        }
        const book = await Book.findById(req.body.newBorrowEntry.isbn)
        if (!book) {
            res.status(400).json("Book does not exist!");
        }
        const newEntry = {
            isbn: req.body.newBorrowEntry.isbn,
            memberEmail: req.body.newBorrowEntry.memberEmail,
            copyNumber: book.availableCopies,
        }
        console.log(book)
        const newBorrowedBook = new BorrowedBook(newEntry)
        const savedBook = await newBorrowedBook.save(); 
        await Book.findByIdAndUpdate(newEntry.isbn, {$inc: {availableCopies: -1}} )
        res.status(201).json(savedBook);
    } catch (err) {
        if (err.code === 11000) {
            console.log("Duplicate entry: The combination of genre, author, and title must be unique.");
          } else {
            console.log("Error adding book:", err);
          }
        //res.status(500).json({error: err.message});
    }
}

export const getAllBorrowedBooks = async (req, res) => {
    try {
        await BorrowedBook.find()
        .then(borrowedBooks => res.json(borrowedBooks))
        .catch(err => res.json(err));
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

export const returnBook = async (req, res) => {
    try {
        await Book.findOneAndUpdate({_id: req.body.borrowedBook.isbn}, {$inc: {availableCopies: +1}});
        await BorrowedBook.deleteOne(req.body.borrowedBook);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}