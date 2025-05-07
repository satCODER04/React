import React from "react";
import axios from "axios";
const API_URL = 'http://localhost:8185/api/payment';
export const createOrders1=(orderRequest)=>axios.post(`${API_URL}/createorder`,orderRequest);

export const paymentConfirm=(confirmPaymentRequest)=>axios.post(`${API_URL}/confirmpayment`,confirmPaymentRequest);