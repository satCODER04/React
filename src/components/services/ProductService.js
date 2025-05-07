import axios from 'axios';

const API_URL = 'http://localhost:8185/api/item';

export const getItems = () => axios.get(`${API_URL}/`);
export const getItemById = (id) => axios.get(`${API_URL}/${id}`);
export const createItem = (item) => axios.post(`${API_URL}/create`, item);
export const updateItem = (item) => axios.put(`${API_URL}/edit`, item);
export const deleteItem = (id) => axios.delete(`${API_URL}/delete/${id}`);