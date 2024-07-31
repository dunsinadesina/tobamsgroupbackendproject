import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
    title: string;
    author: string;
    publishedDate: Date;
    ISBN: string;
    coverImage?: string;
}

const BookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    ISBN: { type: String, required: true, unique: true },
    coverImage: { type: String }
});

const Book = mongoose.model<IBook>('Book', BookSchema);

export default Book;