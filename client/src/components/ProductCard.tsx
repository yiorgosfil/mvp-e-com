import type { Product } from '../../../types/product.types'
import { Link } from 'react-router'

export default function ProductCard({ product }: { product: Product }) {
  const { product_id, title, description, image_url } = product
  return <Link to={`/products/${product_id}`}>
    <div className='flex flex-col items-center justify-between gap-4 shadow rounded-lg p-4 bg-white'>
      <img src={image_url} alt={description} className='h-85 w-65' />
      <h3 className='text-xl'>{title}</h3>
    </div>
  </Link>
}


