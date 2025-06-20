import { Router } from 'express'
import { pool } from '@/db/connection'

const router = Router()

// GET '/' - get all categories ordered by category_id 
router.get('/', async (_, res) => {
  const result = await pool.query('SELECT * FROM categories ORDER BY category_id')
  res.json(result.rows)
})

// POST '/' - create a new category 
router.post('/', async (req, res) => {
  const { title, description, slug } = req.body

  const result = await pool.query(
    `INSERT INTO categories (title description, slug)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [title, description, slug]
  )
  res.status(201).json(result.rows[0])
})

// PUT '/:cateogryId' - update specific fileds of an existing category
router.put('/:categoryId', async (req, res) => {
  const categoryId = parseInt(req.params.categoryId)
  const fields = ['title', 'description', 'slug']
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

  values.push(categoryId)

  const result = await pool.query(
    `UPDATE categories SET ${updates.join(', ')}
    WHERE category_id = $${index}
    RETURNING *`,
    values
  )
  res.json(result.rows[0])
})

// DELETE '/categoryId' - delete category
router.delete('/:categoryId', async (req, res) => {
  const categoryId = parseInt(req.params.categoryId)
  await pool.query('DELETE FROM categories WHERE category_id=$1', [categoryId])
  res.sendStatus(204)
})

export default router
