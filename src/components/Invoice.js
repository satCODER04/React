import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {getOrdersById} from './services/ItemOrdersService';
import {getOrdersDetailsById} from './services/ItemOrdersDetailsService';
const Invoice = ({ orderId }) => {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await getOrdersById(orderId);
                console.log(response.data);
                setOrderDetails(response.data);
                console.log("orderdetails"+orderDetails.itemOrderDetails);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', width: '60%', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center' }}>Invoice</h1>
            <p><strong>Order ID:</strong> {orderDetails.orderid}</p>
            <p><strong>Order Date:</strong> {orderDetails.orderdate}</p>
            <p><strong>Status:</strong> {orderDetails.status}</p>
            <p><strong>Total Amount:</strong> ₹{orderDetails.totalamount}</p>
            <h3>Products:</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                     {orderDetails.itemOrderDetails.map((product, index) => (
                        <tr key={index}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.productname}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>₹{product.price}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.qty}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                ₹{product.itemvalue}
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Thank you for your purchase!</p>
        </div>
    );
};

export default Invoice;
