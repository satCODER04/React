import React from 'react';
import { useParams } from 'react-router-dom';
import Invoice from './Invoice';

const PaymentSuccessPage = () => {
    const { orderId } = useParams(); // Retrieve the orderId from the URL

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase. Your order ID is: <strong>{orderId}</strong></p>
            <Invoice orderId={orderId} />
        </div>
    );
};

export default PaymentSuccessPage;
