
import express from 'express';
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../controller/category.controller.js';


const router = express.Router();

router.post('/createcategory', createCategory);
router.get('/get', getAllCategories);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

export default router;
