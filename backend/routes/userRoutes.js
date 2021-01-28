import express from 'express'
const router = express.Router();
import { authUser, registerUser, getUserProfile, UpdateUserProfile, getUsers, deleteUsers, getUserById, updateUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/').post(registerUser).get(protect, getUsers, admin)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, UpdateUserProfile)
router.route('/:id').delete(protect, admin, deleteUsers).get(protect, admin, getUserById).put(protect,admin, updateUser)





export default router