import { Request, Response } from "express";
import { MongoError } from 'mongodb';
import Book from "../models/book";

//function to create new book
export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, author, publishedDate, ISBN } = req.body;
        const newBook = new Book({ title, author, publishedDate, ISBN });
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
    } catch (error) {
        const mongoError = error as MongoError;
        if (mongoError.code === 11000) {
            res.status(404).json({ error: 'ISBN already exists' })
        } else {
            res.status(500).json({ error });
            console.log("Error in creating book", error);
        }
    }
}

//function to update book cover image
export const updateBookCover = async (req: Request, res: Response) => {
    try {
        console.log('Received ID:', req.params.id);
        const book = await Book.findById(req.params.id);
        if (!book) {
            console.log('Book not found');
            return res.status(404).json({ error: 'Book not found' });
        }
        book.coverImage = req.file?.path;
        const updatedBook = await book.save();
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Error updating book cover', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//function to get all books
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error });
    }
}

//function to get a book by id
export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error })
    }
}

//function to update a book
export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedBook = await Book.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });
        if (!updatedBook) {
            return res.status(400).json({ error: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ error });
    }
};


//function to delete a book
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book successfully deleted' })
    } catch (error) {
        res.status(500).json({ error })
    }
}