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
        console.log(req.body.modifiedBook)
        await Book.findByIdAndUpdate(req.body.modifiedBook._id, 
            {
                title: req.body.modifiedBook.title,
                author: req.body.modifiedBook.author,
                genre: req.body.modifiedBook.genre,
                availableCopies: req.body.modifiedBook.availableCopies
            }
        )
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

export const deleteBook = async (req, res) => {
    try {
        console.log(req.body.selectedBook)
        await Book.findByIdAndDelete(req.body.selectedBook._id)
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}