import { Router } from 'express'
import { getProducts, createNewProduct, updateProduct, createMultipleNewProducts, getProductsFromMasterIfNotInRestaurantProducts } from '../Controllers/products.controller.js';
import { validateProductCreateForm, validateProductUpdateForm, validateProductCreateMultipleForm} from '../Middleware/validators/productValidators.middleware.js';
import  authenticateUser from '../Middleware/authenticate.middleware.js'
import { uploadFile, uploadNoFile } from '../Middleware/multer.middleware.js';

const router = Router();
router.get('/products', getProducts)
router.post('/product', [authenticateUser, uploadFile, validateProductCreateForm ], createNewProduct)
router.patch('/product/:id',[authenticateUser, uploadNoFile, validateProductUpdateForm], updateProduct)
router.post('/import-products', [validateProductCreateMultipleForm, authenticateUser ], createMultipleNewProducts)
router.get('/products-for-restaurant', getProductsFromMasterIfNotInRestaurantProducts)

export default router
