"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.updateBookCover = exports.createBook = void 0;
const book_1 = __importDefault(require("../models/book"));
//function to create new book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, publishedDate, ISBN } = req.body;
        const newBook = new book_1.default({ title, author, publishedDate, ISBN });
        const savedBook = yield newBook.save();
        res.status(200).json(savedBook);
    }
    catch (error) {
        const mongoError = error;
        if (mongoError.code === 11000) {
            res.status(404).json({ error: 'ISBN already exists' });
        }
        else {
            res.status(500).json({ error });
            console.log("Error in creating book", error);
        }
    }
});
exports.createBook = createBook;
//function to update book cover image
const updateBookCover = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('Received ID:', req.params.id);
        const book = yield book_1.default.findById(req.params.id);
        if (!book) {
            console.log('Book not found');
            return res.status(404).json({ error: 'Book not found' });
        }
        book.coverImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const updatedBook = yield book.save();
        res.status(200).json(updatedBook);
    }
    catch (error) {
        console.error('Error updating book cover', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateBookCover = updateBookCover;
//function to get all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.find();
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getAllBooks = getAllBooks;
//function to get a book by id
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getBookById = getBookById;
//function to update a book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedBook = yield book_1.default.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true
        });
        if (!updatedBook) {
            return res.status(400).json({ error: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.updateBook = updateBook;
//function to delete a book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book successfully deleted' });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.deleteBook = deleteBook;
