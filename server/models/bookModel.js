import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    _id: { 
        type: String, 
        required: true 
    },  // Set _id as the isbn field
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

// Indexes for filtering
bookSchema.index({ genre: 1 });
bookSchema.index({ author: 1 });

const Book = mongoose.model("Book", bookSchema);
export default Book;