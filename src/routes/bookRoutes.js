// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Define routes for books
router.get('/books', bookController.getAllBook);
router.get('/books/:id', bookController.getBookById);
router.get('/books/category/:categoryId', bookController.getBookByCategoryId);
router.get('/books/category/name/:categoryName', bookController.getBookByCategoryName);
router.get('/random/books', bookController.getRandomBook);
router.post('/books', bookController.addBook);

module.exports = router;
