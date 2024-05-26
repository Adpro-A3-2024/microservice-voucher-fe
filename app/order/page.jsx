"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './OrderPage.module.css';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://order.inkwanderers.my.id/api/get-all', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
      setMessage('Failed to fetch orders');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Order Page</h1>
      <Link href="/order/create">
        <button className={styles.button}>Create New Order</button>
      </Link>
      <div className={styles.cardContainer}>
        {orders.map((order) => (
          <div key={order.orderId} className={styles.card}>
            <h3>{order.orderId}</h3>
            <p>Status: {order.status}</p>
            <Link href={`/order/${order.orderId}`}>
              <button className={styles.button}>View Details</button>
            </Link>
          </div>
        ))}
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderPage;
