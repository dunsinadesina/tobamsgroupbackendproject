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
const mongodb_memory_server_core_1 = require("mongodb-memory-server-core");
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const book_1 = __importDefault(require("../models/book"));
const request = (0, supertest_1.default)(app_1.default);
let mongoServer;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoServer = yield mongodb_memory_server_core_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    yield mongoose_1.default.connect(mongoUri, {
        serverSelectionTimeoutMS: 30000
    });
    yield book_1.default.deleteMany({});
}), 30000);
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    yield mongoServer.stop();
}), 30000);
let bookId;
it('should create a book', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.post('/books').send({
        title: 'Sample Book',
        author: 'Jesudunsin Adesina',
        ISBN: '123456789',
        publishedDate: '2023-07-31'
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Sample Book');
    bookId = response.body._id;
}), 30000);
it('should get all books', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
}), 30000);
it('should get a book by id', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get(`/books/${bookId}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Sample Book');
}), 30000);
it('should update a book by id', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.put(`/books/${bookId}`).send({
        title: 'Updated Book Title',
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Book Title');
}), 30000);
it('should delete a book by id', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.delete(`/books/${bookId}`);
    expect(response.status).toBe(200);
    const getResponse = yield request.get(`/books/${bookId}`);
    expect(getResponse.status).toBe(404);
}), 30000);
describe('PATCH /books/cover-image/:id', () => {
    it('should update a book cover by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .patch(`/books/cover-image/${bookId}`)
            .attach('coverImage', path_1.default.join(__dirname, 'test-cover.jpg'));
        expect(response.status).toBe(200);
        expect(response.body.coverImage).toContain('uploads/');
    }), 30000);
});
