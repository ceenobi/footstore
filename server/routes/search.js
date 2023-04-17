import express from 'express'
import { getProductBySearch } from '../controllers/search.js'

const router = express.Router()

//search a product
router.get('/search', getProductBySearch)

export default router