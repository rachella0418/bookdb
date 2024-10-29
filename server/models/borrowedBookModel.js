import mongoose from "mongoose";

const borrowedBookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true,
    },
    memberEmail: {
        type: String,
        required: true
    },
    copyNumber: {
        type: Number,
        required: true,
    },
})

borrowedBookSchema.index({ isbn: 1, memberEmail: 1}, { unique: true });


const BorrowedBook = mongoose.model("borrowedBook", borrowedBookSchema);
export default BorrowedBook;