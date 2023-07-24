import { Router } from 'express'
import { createMultipleNewModifierCategories, createMultipleNewModifiers, createMultipleNewRestaurantProductModifiers, createNewModifier, createNewModifierCategory, createNewRestaurantProductModifier, getModifierCategories, getModifiers, getRestaurantProductModifiers, updateModifier, updateModifierCategory, updateRestaurantProductModifier } from '../Controllers/modifiers.controller.js';
import authenticateUser from '../Middleware/authenticate.middleware.js';
import { validateModifierCategoryCreateForm, validateModifierCategoryCreateMultipleForm, validateModifierCategoryUpdateForm, validateModifierCreateForm, validateModifierCreateMultipleForm, validateModifierUpdateForm, validateRestaurantProductModifierCreateForm, validateRestaurantProductModifierCreateMultipleForm, validateRestaurantProductModifierUpdateForm } from '../Middleware/validators/modifierValidators.middleware.js';


const router = Router();
router.get('/modifiers', getModifiers)
router.post('/modifier', [authenticateUser, validateModifierCreateForm], createNewModifier)
router.patch('/modifier/:id', [authenticateUser, validateModifierUpdateForm], updateModifier)
router.get('/modifier-categories', getModifierCategories)
router.post('/modifier-category', validateModifierCategoryCreateForm, createNewModifierCategory)
router.patch('/modifier-category/:id', validateModifierCategoryUpdateForm, updateModifierCategory)
router.get('/restaurant-product-modifiers', getRestaurantProductModifiers)
router.post('/restaurant-product-modifier', [authenticateUser, validateRestaurantProductModifierCreateForm], createNewRestaurantProductModifier)
router.patch('/restaurant-product-modifier/:id', [authenticateUser, validateRestaurantProductModifierUpdateForm], updateRestaurantProductModifier)
router.post('/import-modifier-categories', [authenticateUser, validateModifierCategoryCreateMultipleForm], createMultipleNewModifierCategories)
router.post('/import-modifiers', [authenticateUser, validateModifierCreateMultipleForm], createMultipleNewModifiers)
router.post('/create-multiple-restaurant-product-modifiers', [authenticateUser, validateRestaurantProductModifierCreateMultipleForm], createMultipleNewRestaurantProductModifiers)

export default router