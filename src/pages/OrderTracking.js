// src/components/OrderTracking.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const OrderTracking = () => {
    const { orderId } = useParams();
    const [orderStatus, setOrderStatus] = useState('Pending'); 

    useEffect(() => {
        const fetchOrderStatus = async () => {
            setTimeout(() => {
                setOrderStatus('Shipped'); 
            }, 2000);
        };

        fetchOrderStatus();
    }, [orderId]);

    return (
        <div>
            <h2>Order Tracking</h2>
            <p>Order ID: {orderId}</p>
            <p>Status: {orderStatus}</p>
        </div>
    );
};

export default OrderTracking;
