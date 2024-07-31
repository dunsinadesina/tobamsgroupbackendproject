import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import path from 'path';
import supertest from 'supertest';
import app from '../app';
import Book from '../models/book';

const request = supertest(app);
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // await mongoose.connect(mongoUri, {
    //     serverSelectionTimeoutMS: 30000
    // });

    await Book.deleteMany({});
}, 30000);

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

let bookId: string;

it('should create a book', async () => {
    const response = await request.post('/books').send({
        title: 'Sample Book',
        author: 'Jesudunsin Adesina',
        ISBN: '123456789',
        publishedDate: '2023-07-31'
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Sample Book');
    bookId = response.body._id;
}, 30000);

it('should get all books', async () => {
    const response = await request.get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
},30000);

it('should get a book by id', async () => {
    const response = await request.get(`/books/${bookId}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Sample Book');
},30000);

it('should update a book by id', async () => {
    const response = await request.put(`/books/${bookId}`).send({
        title: 'Updated Book Title',
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Book Title');
},30000);

it('should delete a book by id', async () => {
    const response = await request.delete(`/books/${bookId}`);
    expect(response.status).toBe(200);
    const getResponse = await request.get(`/books/${bookId}`);
    expect(getResponse.status).toBe(404);
},30000);

describe('PATCH /books/cover-image/:id', () => {
    it('should update a book cover by id', async () => {
        const response = await request
            .patch(`/books//cover-image/${bookId}`)
            .attach('coverImage', path.join(__dirname, 'test-cover.jpg'));

        expect(response.status).toBe(200);
        expect(response.body.coverImage).toContain('uploads/');
    },30000);
});