import Book from "../models/bookModel.js";

export const insertBook = async(req, res) => {
    try {
        const newBook = new Book(req.body.newBook)
        const savedBook = await newBook.save(); 
        res.status(201).json(savedBook);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

export const getAllBooks = async (req, res) => {
    try {
        await Book.find()
        .then(books => res.json(books))
        .catch(err => res.json(err));
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

export const updateBook = async (req, res) => {
    try {
        await Book.replaceOne(
            {"isbn": req.body.modifiedBook.isbn},
            req.body.modifiedBook
        )
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

export const deleteBook = async (req, res) => {
    try {
        await Book.deleteOne(
            {"isbn": req.body.selectedBook.isbn}
        )
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}