import { useParams, useNavigate } from 'react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/api/api'
import type { Product } from '../../../types/product.types'

export default function ProductPage() {
  const { product_id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: product } = useQuery<Product, Error>({
    queryKey: ['product'],
    queryFn: async (): Promise<Product> => {
      const res = await api.get<Product>(`products/${product_id}`)
      return res.data
    }
  })

  const [form, setForm] = useState({ title: '', description: '', image_url: '' })

  const updateProduct = useMutation<void, Error, Partial<Product>>({
    mutationFn: (updatedProduct: Partial<Product>) =>
      api.put(`/products/${product_id}`, updatedProduct),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ['product', product_id]
    })
  })

  const deleteProduct = useMutation<void, Error, void>({
    mutationFn: () => api.delete(`/products/${product_id}`),
    onSuccess: () => navigate('/products')
  })

  if (!product) return <p>Loading...</p>

  const { title, description, image_url } = product

  return <div>
    <h2 className="text-xl font-bold mb-2">Edit Product</h2>
    <input className="block mb-2 p-2 border" defaultValue={title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
    <textarea className="block mb-2 p-2 border" defaultValue={description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
    <input className="block mb-2 p-2 border" defaultValue={image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
    <button onClick={() => updateProduct.mutate(form)} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">Save</button>
    <button onClick={() => deleteProduct.mutate()} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
  </div>
}
