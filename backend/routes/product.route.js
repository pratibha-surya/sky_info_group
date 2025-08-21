

import express from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controller/product.controller.js';


const router = express.Router();

router.post('/createproduct', createProduct);
router.get('/getproduct', getAllProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
