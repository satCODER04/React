import axios from 'axios';

const API_URL = 'http://localhost:8185/api/users';

export const getUsers = () => axios.get(`${API_URL}/`);//get all the users, API_URL-->variable name 
export const getUsersId = (id) => axios.get(`${API_URL}/${id}`);
export const createUsers = (users) => axios.post(`${API_URL}/create`,users);

export const updateUsers = (users) => axios.put(`${API_URL}/edit`, users);
export const deleteUsers = (id) => axios.delete(`${API_URL}/delete/${id}`);
export const userLogin = (emailid, password) => {
    const params = new URLSearchParams();
    console.log(emailid);
    console.log(password);
    params.append("emailid", emailid);
    params.append("password", password);
  
    return axios.post(`${API_URL}/login`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };
  //export means the variable can be used in other files