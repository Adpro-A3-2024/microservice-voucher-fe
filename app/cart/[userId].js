import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const PRODUCT_API_URL = 'http://product-microservice.faizi.biz.id'; // Replace with your actual product microservice API URL
const CART_API_URL = 'http://34.87.117.109/api'; // Replace with your actual cart microservice API URL

const fetchCart = async (userId, setCart, setProducts) => {
    try {
        const response = await axios.get(`${CART_API_URL}/cart/${userId}`);
        setCart(response.data);

        // Fetch product details for each product in the cart
        const productIds = Object.keys(response.data.productsInCart);
        const productDetailsPromises = productIds.map(productId =>
            axios.get(`${PRODUCT_API_URL}/find-by-id?id=${productId}`)
        );
        const productDetailsResponses = await Promise.all(productDetailsPromises);
        const productDetailsMap = {};
        productDetailsResponses.forEach(response => {
            const product = response.data;
            productDetailsMap[product.productId] = product;
        });
        setProducts(productDetailsMap);
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
};

const CartPage = () => {
    const router = useRouter();
    const { userId } = router.query;
    const [cart, setCart] = useState(null);
    const [products, setProducts] = useState({});

    useEffect(() => {
        if (userId) {
            fetchCart(userId, setCart, setProducts);
        }
    }, [userId]);

    const handleAddToCart = async (productId, quantity) => {
        try {
            await axios.post(`${CART_API_URL}/cart/${userId}/add-product`, {
                productId,
                quantity,
            });
            // Refresh cart after adding product
            await fetchCart(userId, setCart, setProducts);
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            await axios.delete(`${CART_API_URL}/cart/${userId}/delete-product`, {
                data: { productId },
            });
            // Refresh cart after removing product
            await fetchCart(userId, setCart, setProducts);
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const handleCheckout = async (name, address) => {
        try {
            // Here you might want to fetch the cart again to ensure it's up to date
            const response = await axios.post(`${CART_API_URL}/cart/${userId}/checkout`, null, {
                params: { name, address },
            });
            console.log('Checkout successful:', response.data);
            // Handle success, redirect, etc.
        } catch (error) {
            console.error('Error checking out:', error);
        }
    };

    return (
        <div className="container">
            <h1>Cart for User {userId}</h1>
            {cart && (
                <div className="cart-items">
                    {/* Render cart items */}
                    <ul>
                        {Object.entries(cart.productsInCart).map(([productId, quantity]) => (
                            <li key={productId}>
                                {products[productId] ? (
                                    <>
                                        {products[productId].productName} - Quantity: {quantity}
                                        <button onClick={() => handleRemoveFromCart(productId)}>Remove</button>
                                    </>
                                ) : (
                                    <span>Loading product...</span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => handleCheckout('John Doe', '123 Main St')}>Checkout</button>
                </div>
            )}
            <style>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .cart-items {
          margin-top: 20px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
        }
        button {
          margin-left: 10px;
        }
      `}</style>
        </div>
    );
};

export default CartPage;
