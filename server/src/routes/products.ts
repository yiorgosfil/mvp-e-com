import { Router } from 'express'
import { pool } from '@/db/connection'

const router = Router()

// GET '/query' - Search/filter products by title and/or category
router.get('/query', async (req, res) => {
  const { searchTerm, categoryIds } = req.query
  let categoriesArray: number[] | null = null // Array that holds the processed incoming categoryIds

  if (categoryIds) {
    const rawIds = Array.isArray(categoryIds)
      ? categoryIds
      : String(categoryIds).split(',')

    categoriesArray = rawIds
      .map((id: any) => parseInt(id, 10))
      .filter(id => !isNaN(id));

    if (categoriesArray.length === 0) {
      categoriesArray = null;
    }
  }

  try {
    const result = await pool.query(
      `SELECT * FROM products
     WHERE 
       ($1::text IS NULL OR LOWER(title) LIKE '%' || LOWER($1) || '%') AND
       ($2::int[] IS NULL OR category_id = ANY($2))
     ORDER BY product_id ASC`,
      [searchTerm || null, categoriesArray]
    )
    res.json(result.rows);
  } catch (error) {
    console.error('Query failed:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// GET '/' - get all products ordered by product_id
router.get('/', async (_, res) => {
  const result = await pool.query(
    'SELECT * FROM products ORDER BY product_id ASC'
  )
  res.json(result.rows)
})

// POST '/' - create a new product
router.post('/', async (req, res) => {
  const { title, description, imageUrl, categoryId } = req.body
  const result = await pool.query(
    `INSERT INTO products (title, description, image_url, categoryId)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [title, description, imageUrl, categoryId]
  )
  res.status(201).json(result.rows[0])
})

// PUT '/:productId' - update specific fields of an existing product
router.put('/:productId', async (req, res) => {
  const productId = parseInt(req.params.productId)
  const fields = ['title', 'description', 'image_url', 'category_id']
  const updates = []
  const values = []
  let index = 1

  for (const field of fields) {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = $${index}`)
      values.push(req.body[field])
      index++
    }
  }

  values.push(productId)

  const result = await pool.query(
    `UPDATE products SET ${updates.join(', ')} 
    WHERE product_id = $${index}
    RETURNING *`,
    values
  )
  res.json(result.rows[0])
})

// DELETE '/:productId' - delete product
router.delete('/:productId', async (req, res) => {
  const productId = parseInt(req.params.productId)
  await pool.query(`DELETE FROM products WHERE product_id=$1`,
    [productId]
  )
  res.sendStatus(204)
})

// GET '/:productId' - get specific product
router.get('/:productId', async (req, res) => {
  const productId = parseInt(req.params.productId)
  const result = await pool.query(
    `SELECT * FROM products 
    WHERE product_id=$1`,
    [productId]
  )
  res.json(result.rows[0])
})

export default router
