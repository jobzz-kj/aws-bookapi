// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Define routes for categories
router.get('/categories', categoryController.getAllCategory);
router.get('/categories/:id/name', categoryController.getCategoryName);
router.get('/categories/:name/id', categoryController.getCategoryId);
router.post('/categories', categoryController.addCategory);

module.exports = router;
