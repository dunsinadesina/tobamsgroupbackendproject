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
const node_test_1 = require("node:test");
const path_1 = __importDefault(require("path"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
//test to create book
(0, node_test_1.describe)('Books API', () => {
    it('should create a book', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/books')
            .send({
            title: 'Test Book',
            author: 'Test Author',
            publishedDate: '2024-07-30',
            ISBN: '123456789'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Test Book');
        expect(response.body).toHaveProperty('author', 'Test Author');
        expect(response.body).toHaveProperty('publishedDate', '2024-07-30');
        expect(response.body).toHaveProperty('ISBN', '123456789');
    }));
});
//test to get all books
(0, node_test_1.describe)('Books API', () => {
    it('should get all the books', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/books');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }));
});
//test to get a book by id
(0, node_test_1.describe)('Books API', () => {
    let bookId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/books')
            .send({
            title: 'Test Book',
            author: 'Test Author',
            publishedDate: '2024-07-30',
            ISBN: '123456789'
        });
        bookId = response.body.id;
    }));
    it('should get a book by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(`/books/${bookId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Test Book');
        expect(response.body).toHaveProperty('author', 'Test Author');
    }));
});
//test to update book
(0, node_test_1.describe)('Books API', () => {
    let bookId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/books')
            .send({
            title: 'Test Book',
            author: 'Test Author',
            publishedDate: '2024-07-30',
            ISBN: '123456789'
        });
        bookId = response.body.id;
    }));
    it('should update a book by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .put(`/books/${bookId}`)
            .send({
            title: 'Updated Test Book',
            author: 'Updated Test Author',
            publishedDate: '2024-07-30',
            ISBN: '123456789'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated Test Book');
    }));
});
//test to update book cover page
(0, node_test_1.describe)('Book API', () => {
    let bookId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/books')
            .send({
            title: 'Test Book',
            author: 'Test Author',
            publishedDate: '2024-07-30',
            ISBN: '123456789'
        });
        bookId = response.body.id;
    }));
    it('should update a book cover by the id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/books/cover-image/${bookId}`)
            .attach('coverImage', path_1.default.join(__dirname, 'test-cover.jpg'));
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('coverImage');
        expect(response.body.coverImage).toMatch(/test-cover.jpg$/);
    }));
});
//to test deleting a book
(0, node_test_1.describe)('Books API', () => {
    let bookId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/books')
            .send({
            title: 'Test Book',
            author: 'Test Author',
            publishedDate: '2024-07-30',
            ISBN: '123456789'
        });
        bookId = response.body.id;
    }));
    it('should delete a book by its id', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/books/${bookId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message: Book has been successfully deleted');
    }));
});
