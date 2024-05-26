"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import styles from './OrderDetailPage.module.css';

const OrderDetailPage = () => {
  const router = useRouter();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [delivery, setDelivery] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
    }
  }, [orderId]);

  const fetchOrderById = async (id) => {
    try {
      const response = await axios.get(`http://order.inkwanderers.my.id/api/get`, {
        params: { orderId: id },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setOrder(response.data);
    } catch (error) {
      console.error('Failed to fetch order', error);
      setMessage('Failed to fetch order');
    }
  };

  const updateOrderStatus = async (orderId, status, delivery) => {
    try {
      const response = await axios.put('http://order.inkwanderers.my.id/api/edit-status', {
        orderId,
        status,
        delivery
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage(response.data);
      fetchOrderById(orderId);  // Refresh order details
    } catch (error) {
      console.error('Failed to update order status', error);
      setMessage(error.response ? error.response.data : 'An error occurred');
    }
  };

  const handleUpdateStatus = () => {
    if (order && status) {
      updateOrderStatus(order.orderId, status, delivery);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Order Details</h1>
      {order ? (
        <>
          <div className={styles.card}>
            <h3>Order ID: {order.orderId}</h3>
            <p>Status: {order.status}</p>
            <p>Total Price: {order.totalPrice}</p>
            <div className={styles.cartItems}>
              {order.cartItems.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <h4>{item.productName}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {item.productPrice}</p>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="New Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={styles.input}
            />
            {status === 'SHIPPED' && (
              <input
                type="text"
                placeholder="Delivery Method"
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className={styles.input}
              />
            )}
            <button onClick={handleUpdateStatus} className={styles.button}>Update Status</button>
          </div>
          <div className={styles.totalPrice}>
            <h3>Total Price: {order.totalPrice}</h3>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderDetailPage;
