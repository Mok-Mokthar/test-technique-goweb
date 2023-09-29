import React from 'react'
import { ProductPage } from './page/ProductPage';
import { ProductsManagement } from './page/ProductsManagement';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const App = () => {

  //router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/products"/>,
    },
    {
      path: "/products",
      element: <ProductsManagement/>,
    },
    {
      path: "/product/:productId",
      element: <ProductPage/>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App