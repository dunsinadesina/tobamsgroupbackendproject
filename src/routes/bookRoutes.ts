import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook, updateBookCover } from "../controllers/bookController";
import upload from "../middlewares/fileUpload";

const router = Router();

router.post('/', createBook);
router.patch('/cover-image/:id', upload.single('coverImage'), updateBookCover);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;