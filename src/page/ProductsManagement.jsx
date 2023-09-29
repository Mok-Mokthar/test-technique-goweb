import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import Products from '../components/products/Products'
import './ProductsManagement.scss';
import { TabTitle } from '../utils';

export const ProductsManagement = () => {

  TabTitle("Circle Products | Products management")

  return (
    <div className='pageContainer'>
        <Sidebar/>
        <div className="contentContainer">
          <Products/>
        </div>
    </div>
  )
}
