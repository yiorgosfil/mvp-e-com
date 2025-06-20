import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/api/api'
import type { Product } from '../../../types/product.types'
import type { Category } from '../../../types/category.types'
import ProductCard from '@/components/ProductCard'

// const { searchTerm, categoryIds } = req.query


export default function Products() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryIds, setCategoryIds] = useState<number[]>([])
  const queryClient = useQueryClient()

  const { data: queredproducts = [] } = useQuery<Product[], Error>({
    queryKey: ['products', searchTerm, categoryIds],
    queryFn: async (): Promise<Product[]> => {
      const res = await api.get<Product[]>('/products/query', {
        params: {
          searchTerm: searchTerm || undefined,
          categoryIds: categoryIds?.length ? categoryIds : undefined
        }
      })
      return res.data
    }
  })

  const { data: products = [] } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const res = await api.get<Product[]>('/products')
      return res.data
    }
  })

  const { data: categories = [] } = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const res = await api.get<Category[]>('/categories')
      return res.data
    }
  })

  // const createProduct = useMutation({
  //   mutationFn: (newProduct) => api.post('/products', newProduct),
  //   onSuccess: () => queryClient.invalidateQueries(['products'])
  // })

  return <section className='my-12 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
    {products.map((product: Product) => (
      <ProductCard key={product.product_id} product={product} />
    ))}
  </section>
}
