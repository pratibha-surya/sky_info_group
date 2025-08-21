
import express from 'express';
import { createSubcategory, deleteSubcategory, getAllSubcategories, updateSubcategory } from '../controller/subcategory.controller.js';

const router = express.Router();

router.post('/subcategories', createSubcategory);
router.get('/getsubcategory', getAllSubcategories);
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategory);

export default router;
