import express from 'express'
import { getProductCategory } from '../controllers/category.js'

const router = express.Router()

//get all category
router.get('/', getProductCategory)

export default router