import { Router } from 'express'
import { createNewUser, login, getMyProfile, getUserList, updateUser, logout, getUserRoles, showUser } from '../Controllers/users.controller.js';
import authenticateUser from '../Middleware/authenticate.middleware.js';
import { validateUserCreateForm, validateUserUpdateForm } from '../Middleware/validators/userValidators.middleware.js';

const router = Router();

router.post('/user', [authenticateUser, validateUserCreateForm], createNewUser)
router.post('/login', login)
router.get('/me', authenticateUser, getMyProfile)
router.get('/users', getUserList)
router.get('/user/:id', showUser)
router.patch('/user/:id', [authenticateUser, validateUserUpdateForm], updateUser)
router.put('/logout', authenticateUser, logout)
router.get('/user-roles', getUserRoles)

export default router
