import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Product from '../components/product/Product';
import './ProductsManagement.scss';

export const ProductPage = () => {
  return (
    <div className='pageContainer'>
        <Sidebar/>
        <div className="contentContainer">
          <Product/>
        </div>
    </div>
  )
}
