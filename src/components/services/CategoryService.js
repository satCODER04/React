import axios from 'axios';

const API_URL = 'http://localhost:8185/api/category';

export const getCategories = () => axios.get(`${API_URL}/`);
export const getCategoryById = (id) => axios.get(`${API_URL}/${id}`);
export const createCategory = (category) => axios.post(`${API_URL}/create`, category);
export const updateCategory = (category) => axios.put(`${API_URL}/edit`, category);
export const deleteCategory = (id) => axios.delete(`${API_URL}/delete/${id}`);
