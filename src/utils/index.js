//Met à jour le titre de l'onglet
export const TabTitle = (newTitle) =>{
    return (document.title = newTitle);
};

//fetch tous les produits
export async function fetchProducts(filter){

    const {limit} = filter;

    const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);

    const result = await response.json();

    return result;
}

//fetch un produit
export async function fetchSingleProduct(id){

    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    const result = await response.json();

    return result;
}

//fetch produit en fonction des catégories
export async function fetchProductsByCategories(){
    const response = await fetch('https://fakestoreapi.com/categories');

    const result = await response.json();

    return result;
}

// Calcul TVA
export const VATCalculation = (price) => {

    const VATAmount = price * 0.2;

    const priceWithVAT = price + VATAmount;

    return priceWithVAT.toFixed(2);
}