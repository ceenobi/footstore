import express from 'express'
import Product from './models/Product.js'
import data from './Data.js'
import Category from './models/Category.js'

const router = express.Router()

router.post('/products', async (req, res) => {
  await Product.deleteMany({})
  const importProducts = await Product.insertMany(data.products)
  res.send({ importProducts })
})
router.post('/categories', async (req, res) => {
  await Product.deleteMany({})
  const importCategories = await Category.insertMany(data.categories)
  res.send({ importCategories })
})

export default router
