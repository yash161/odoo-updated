import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    book_id: {
        type: Number,
        required: [true, "Please provide the book ID"],
        // unique: true
    },
    isbn: {
        type: String,
        required: [true, "Please provide the ISBN"],
        unique: true
    },
    title: {
        type: String,
        required: [true, "Please provide the title"]
    },
    author: {
        type: String, 
        required: [true, "Please provide the author(s)"]
    },
    publisher: {
        type: String,
        required: [true, "Please provide the publisher"]
    },
    year: {
        type: Number,
        required: [true, "Please provide the publication year"]
    },
    genre: {
        type: String, 
        required: [true, "Please provide the genre(s)"]
    },
    quantity: {
        type: Number,
        required: [true, "Please provide the quantity"]
    },
    available_quantity: {
        type: Number,
        required: [true, "Please provide the available quantity"]
    }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;