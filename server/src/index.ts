import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

import productRoutes from './routes/products'
import categoryRoutes from './routes/categories'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Routes
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)

//Server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`)
})

