"use client";

import React, { useState } from 'react';
import axios from 'axios';
import styles from './CreateOrderPage.module.css';

const CreateOrderPage = () => {
  const [products, setProducts] = useState([{ productName: '', quantity: '', productPrice: '' }]);
  const [message, setMessage] = useState('');

  const handleInputChange = (index, event) => {
    const values = [...products];
    values[index][event.target.name] = event.target.value;
    setProducts(values);
  };

  const handleAddProduct = () => {
    setProducts([...products, { productName: '', quantity: '', productPrice: '' }]);
  };

  const handleRemoveProduct = (index) => {
    const values = [...products];
    values.splice(index, 1);
    setProducts(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cartItems = products.map(product => ({
      productName: product.productName,
      quantity: parseInt(product.quantity),
      productPrice: parseFloat(product.productPrice),
    }));

    try {
      const response = await axios.post('http://order.inkwanderers.my.id/api/create-order', { cartItems }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage('Order created successfully!');
      setProducts([{ productName: '', quantity: '', productPrice: '' }]);  // Reset the form
    } catch (error) {
      console.error('Failed to create order', error);
      setMessage('Failed to create order');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Order</h1>
      <form onSubmit={handleSubmit}>
        {products.map((product, index) => (
          <div key={index} className={styles.product}>
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={product.productName}
              onChange={event => handleInputChange(index, event)}
              className={styles.input}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={product.quantity}
              onChange={event => handleInputChange(index, event)}
              className={styles.input}
              required
            />
            <input
              type="number"
              step="0.01"
              name="productPrice"
              placeholder="Product Price"
              value={product.productPrice}
              onChange={event => handleInputChange(index, event)}
              className={styles.input}
              required
            />
            <button type="button" onClick={() => handleRemoveProduct(index)} className={styles.buttonRemove}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddProduct} className={styles.buttonAdd}>Add Product</button>
        <button type="submit" className={styles.buttonSubmit}>Create Order</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default CreateOrderPage;