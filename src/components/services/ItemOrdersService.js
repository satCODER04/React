import React from "react";
import axios from "axios";
const API_URL = 'http://localhost:8185/api/orders';
export const getOrders=()=>axios.get(`${API_URL}/`);
//export const createOrders=(orders)=>axios.post(`${API_URL}/create`,orders);
export const updateOrders=(orders)=>axios.post(`${API_URL}/edit`,orders);
export const deleteOrders=(id)=>axios.get(`${API_URL}/delete/${id}`);
export const getOrdersById=(id)=>axios.get(`${API_URL}/${id}`);
export const createOrders=(orderRequest)=>axios.post(`${API_URL}/placeorder`,orderRequest);
