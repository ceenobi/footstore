import express from 'express'
import authorize from '../middleware/auth.js'
import {
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from '../controllers/authUser.js'

const router = express.Router()

//create a user
router.post('/register', registerUser)
//login a user
router.post('/login', loginUser)
//get userprofile
router.get('/profile/:id', authorize, getUserProfile)
//update userprofile
router.put('/profile', authorize, updateUserProfile)

export default router
