"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const fileUpload_1 = __importDefault(require("../middlewares/fileUpload"));
const router = (0, express_1.Router)();
router.post('/', bookController_1.createBook);
router.patch('/cover-image/:id', fileUpload_1.default.single('coverImage'), bookController_1.updateBookCover);
router.get('/', bookController_1.getAllBooks);
router.get('/:id', bookController_1.getBookById);
router.put('/:id', bookController_1.updateBook);
router.delete('/:id', bookController_1.deleteBook);
exports.default = router;
