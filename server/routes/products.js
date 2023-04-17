import express from 'express'
import authorize from '../middleware/auth.js'
import {
  createNewProduct,
  deleteProduct,
  featuredProducts,
  getAllProducts,
  getAllProductsByCat,
  getSingleProduct,
} from '../controllers/product.js'

const router = express.Router()

//get featured products
router.get('/featured', featuredProducts)
//get all products
router.get('/', getAllProducts)
//get single product
router.get('/:slug', getSingleProduct)
//get products by category
router.get('/category/:categoryid', getAllProductsByCat)
//delete a product
router.delete('/:id', authorize, deleteProduct)
//create a new product
router.post('/', authorize, createNewProduct)

export default router
