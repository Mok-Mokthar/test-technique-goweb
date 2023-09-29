import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct, TabTitle, VATCalculation } from '../../utils';
import './Product.scss';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = () => {

    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [updatedPrice, setUpdatedPrice] = useState('');
    const [isPriceModified, setIsPriceModified] = useState(false);

    //Récupère le produit
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await fetchSingleProduct(productId);
                setProduct(product);
                setUpdatedPrice(product.price.toString()); // Initialise updatedPrice avec le prix actuel
            } catch (error) {
                console.error('Erreur lors de la récupération du produit :', error);
            }
        };
        fetchProduct();
    }, [productId]);

    // associe une catégorie à une couleur
    const getCategoryColor = (category) => {
        const colors = {
            'electronics': '#FF5733',
            'jewelery': '#32B436',
            "men's clothing": '#FFA846',
            "women's clothing": '#FF33E3'
        };
        return colors[category] || '';
    }

    const categoryColor = getCategoryColor(product.category);

    const handlePriceChange = (event) => {
        const newPrice = event.target.value;

        // Comparer avec le prix d'origine
        const isModified = parseFloat(newPrice) !== product.price;
    
        // Met à jour le state updatedPrice et isPriceModified
        setUpdatedPrice(newPrice);
        setIsPriceModified(isModified);
    };


    const updateProduct = () => {
        //mettre au même format que la Data reçu
        const updatedProductData = {
            title: product.title,
            price: parseFloat(updatedPrice),
            description: product.description,
            image: product.image,
            category: product.category
        };

        // Axios pour effectuer la requête PUT
        axios.put(`https://fakestoreapi.com/products/${productId}`, updatedProductData)
            .then((response) => {
                console.log('Produit mis à jour avec succès :', response.data);
                setProduct(response.data);
            })
            .catch((error) => {
                console.error('Erreur lors de la mise à jour du produit :', error);
            });
    };

    TabTitle(`Circle Products | ${product.title}`)

    return (
        <div className="product">
            <div className="headerWrapper">
                <Link to="/products">
                    <AiOutlineArrowLeft className="returnArrow"/>
                </Link>
            <h1>{product.title}</h1>
            </div>
            <section className="contentContainer">
                <div className="left">
                    <div className="imageContainer">
                        <img src={product.image} alt={product.title} />
                    </div>
                </div>
                <div className="right">
                    <div className="topSection">
                        <div className="description">
                            <h2>Description</h2>
                            <p>{product.description}</p>
                        </div>
                        <div className="category">
                            <h2>Category</h2>
                            <span style={{ backgroundColor: categoryColor }}>
                                {product.category}
                            </span>
                        </div>
                    </div>
                    <div className="bottomSection">
                        <div className="price">
                            <h2>Price</h2>
                            <div className="priceContent">
                                <input
                                    type="text"
                                    onChange={handlePriceChange}
                                    value={`${updatedPrice}`}
                                />
                                <div className="priceVAT">
                                    <p><strong>Price</strong> (including VAT): {VATCalculation(parseFloat(updatedPrice))} €</p>
                                </div>
                            </div>
                            <div className="update">
                                <button 
                                    onClick={updateProduct} 
                                    disabled={!isPriceModified}
                                    style={isPriceModified ? { cursor: 'pointer' } : { cursor: 'not-allowed' }}
                                    className={isPriceModified ? 'pointer' : 'not-allowed'}     
                                >
                                    Update Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Product;