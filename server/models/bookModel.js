import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
    genre: {
        type: String,
        required: false,
    },
    availableCopies: {
        type: Number,
        required: true,
    },
    
},
{
    timestamps: true
}
);

const Book = mongoose.model("Book", bookSchema);
export default Book;