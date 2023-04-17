import { errorHandler } from '../config/error.js'
import Product from '../models/Product.js'

//get featured products
export const featuredProducts = async (req, res, next) => {
  try {
    const productFeatured = await Product.find({ isFeatured: true })
    if (productFeatured) {
      res.json(productFeatured)
    } else {
      res.status(404)
      throw new Error('Products not found')
    }
  } catch (err) {
    next(err)
  }
}

//get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    if (!products) return next(errorHandler)
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
}
//get all products by category
export const getAllProductsByCat = async (req, res, next) => {
  try {
    const products = await Product.find({ category: req.params.categoryid })
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
}
//get single product
export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
    res.status(200).json(product)
  } catch (err) {
    next(err)
  }
}

//delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json('Product deleted successfully')
  } catch (err) {
    next(err)
  }
}

//create a product
export const createNewProduct = async (req, res, err) => {
  try {
    const product = await Product.insertMany(req.body)
    res.status(200).json(product)
  } catch (err) {
    next(err)
  }
}
