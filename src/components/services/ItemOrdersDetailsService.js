import React from "react";
import axios from "axios";
const API_URL = 'http://localhost:8185/api/orderdetails';
export const getOrdersDetails=()=>axios.get(`${API_URL}/`);
export const createOrdersDetails=(itemOrderDetails)=>axios.get(`${API_URL}/create`,itemOrderDetails);
export const updateOrdersDetails=(itemOrderDetails)=>axios.get(`${API_URL}/edit`,itemOrderDetails);
export const deleteOrdersDetails=(id)=>axios.get(`${API_URL}/delete/${id}`);
export const getOrdersDetailsById=(id)=>axios.get(`${API_URL}/${id}`);
