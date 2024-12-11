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
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

export const updateBook = async (req, res) => {
    try {
        const book = req.body.modifiedBook
        const updated = await Book.findByIdAndUpdate(book._id, 
            {
                title: book.title,
                author: book.author,
                genre: book.genre,
                availableCopies: book.availableCopies
            }
        )
        res.status(201).json(updated);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

export const deleteBook = async (req, res) => {
    try {
        const book = req.body.selectedBook
        const deleted = await Book.findByIdAndDelete(book)
        res.status(201).json(deleted);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
}

export const filterByGenre = async (req, res) => {
    try {
        const genre = req.body.filterByGenre.genre
        await Book.find({ genre: genre }).then(books => res.json(books));
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}

export const filterByAuthor = async (req, res) => {
    try {
        const author = req.body.filterByAuthor.author
        await Book.find({ author: author }).then(books => res.json(books));
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message})
    }
}