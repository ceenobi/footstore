import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { notFound, errorHandler } from './config/error.js'
import postProducts from './DataImport.js'
import authRoutes from './routes/authUser.js'
import productRoutes from './routes/products.js'
import categoryRoutes from './routes/categories.js'
import orderRoutes from './routes/orders.js'
import searchRoutes from './routes/search.js'

const app = express()
dotenv.config()
app.use(cors())

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Mongodb successfully connected')
    })
    .catch((err) => {
      throw err
    })
}

app.use(express.json())
//api
app.use('/api/import', postProducts)
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/catalog', searchRoutes)

app.get('/', (req, res) => {
  res.send('app is running')
})
//Error handlers
app.use(notFound)
app.use(errorHandler)

app.listen(8000, () => {
  connect()
  console.log('Connected to server')
})
