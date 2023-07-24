import { Router } from 'express'
import { getRestaurantCuisinesList, getRestaurantOutletsList, getRestaurantProductsList, getRestaurantTimeSlotsList, getRestaurantSettings, createNewRestaurantSettings, updateRestaurantSettings, createRestaurantTableList, getRestaurantTables, updateRestaurantTable, updateRestaurantProducts, getRestaurants, getRestaurantsForProduct, createRestaurantProduct, updateRestaurantProductsStatus, deleteRestaurantProduct, getRestaurantSettingsThroughUniqueId } from '../Controllers/restaurants.controller.js'
import { validateRestaurantSettingsCreateForm, validateRestaurantSettingsUpdateForm, validateRestaurantTableListCreateForm, validateRestaurantProductUpdateForm } from '../Middleware/validators/restaurantValidators.middleware.js';
import authenticateUser from '../Middleware/authenticate.middleware.js'

const router = Router();

router.get('/restaurant-cuisines', getRestaurantCuisinesList)
router.get('/restaurant-outlets', getRestaurantOutletsList)
router.get('/restaurant-products', getRestaurantProductsList)
router.get('/restaurant-time-slots', getRestaurantTimeSlotsList)
router.get('/restaurant-settings', getRestaurantSettings)
router.get('/restaurant-setting/:uniqueId', getRestaurantSettingsThroughUniqueId)
router.post('/restaurant-settings', [validateRestaurantSettingsCreateForm, authenticateUser], createNewRestaurantSettings)
router.patch('/restaurant-settings/:id', [authenticateUser, validateRestaurantSettingsUpdateForm], updateRestaurantSettings)
router.get('/restaurant-tables', getRestaurantTables)
router.post('/restaurant-tables', [authenticateUser, validateRestaurantTableListCreateForm], createRestaurantTableList)
router.patch('/restaurant-table/:restaurant_id/:table_id', authenticateUser, updateRestaurantTable)
router.patch('/restaurant-product/:restaurant_product_id', [authenticateUser, validateRestaurantProductUpdateForm], updateRestaurantProducts)
router.get('/restaurants', getRestaurants)
router.get('/restaurants-for-product', getRestaurantsForProduct)
router.post('/restaurant-products', authenticateUser, createRestaurantProduct)
router.patch('/restaurant-product-status', authenticateUser, updateRestaurantProductsStatus)
router.delete('/restaurant-product/:restaurant_id/:product_id', authenticateUser, deleteRestaurantProduct)
export default router