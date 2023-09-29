import React, { useEffect, useState } from 'react'
import { fetchProducts, VATCalculation } from '../../utils'
import './Products.scss';
import { useNavigate } from 'react-router-dom';

 const Products = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    const redirectToProductDetail = (productId) => {
        navigate(`/product/${productId}`);
    };

    // Récupère les produits ainsi que les catégories
    useEffect(() => {
        const fetchAllProducts = async () => {
          try {
            const products = await fetchProducts({});
            setAllProducts(products);
          } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
          }
        };
    
        const fetchAllCategories = async () => {
            try {
              const response = await fetch('https://fakestoreapi.com/products/categories');
              
              if (!response.ok) {
                throw new Error('Réponse non valide de l\'API');
              }
              
              const categories = await response.json();
              setCategories(categories);
            } catch (error) {
              console.error('Erreur lors de la récupération des catégories :', error);
            }
        };
    
        fetchAllProducts();
        fetchAllCategories();
      }, []);
    
    // en fonction d'une catégorie associe une couleur
    const getCategoryColor = (category) => {
        const index = categories.indexOf(category);
        const colors = ['#FF5733', '#32B436', '#FFA846', '#FF33E3'];
    
        if (index !== -1) {
            return colors[index % colors.length];
        }
    
        return '';
    }

  return (
    <div className='products'>
        <h1>Products management</h1>
        <div className="tableContainer">
            <table>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Price (including VAT)</th>
                    </tr>
                </thead>
                <tbody>
                    {allProducts.map((product) => (
                        <tr key={product.id} onClick={() => redirectToProductDetail(product.id)}>
                            <td className='productTitle'>{product.title}</td>
                            <td>
                                <span className="productCategory" style={{ backgroundColor: getCategoryColor(product.category) }}>
                                    {product.category}
                                </span>
                                </td>
                            <td>{product.price} €</td>
                            <td className='productPriceVAT'>{VATCalculation(product.price)} €</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Products