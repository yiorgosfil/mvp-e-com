import { createBrowserRouter, RouterProvider } from 'react-router'

import HomePage from './pages/Homepage'
import Products from './pages/Products'
import ProductDetails from './pages/ProductPage'
import Categories from './pages/Categories'
import Layout from './layouts/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <ProductDetails />
      },
      {
        path: 'categories',
        element: <Categories />
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
