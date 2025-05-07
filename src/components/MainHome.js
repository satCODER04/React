import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';
import Header from './Header';
import Menu from './Menu';
import {deleteItem, getItems} from "./services/ProductService"
const Home = ({ addToCart })  => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  //const { addToCart } = useCart();
  
  //const [product, setProduct] = useState([]);
  const [error, setError] = useState([]);
  
// const addtocart=async (product)=>{
//   //console.log("hi");
// //console.log(product._id);
// const response=await axios.post('http://localhost:8185/cart/add',
//   {
    
//     "productId": product.itemId,
//     "quantity": 1,
//     "name": product.itemName,
//     "price": product.price
//   }
// )
// console.log(response.status);
// }
  const loadProductsBySell = async () => {
    try {
      const response = await getItems();
      setProductsBySell(response.data);
    } catch (error) {
      console.error("Error fetching Items:", error);
    }
  };
  const loadProductsByArrival = async () => {
    try {
      const response = await getItems();
      setProductsByArrival(response.data);
    } catch (error) {
      console.error("Error fetching Items:", error);
    }
  };
const fetchItems = async () => {
        try {
          const response = await getItems();
          setProductsByArrival(response.data);
        } catch (error) {
          console.error("Error fetching Items:", error);
        }
      };
  useEffect(() => {
    //var arr =  JSON.parse(localStorage.getItem('user')) ;
    //console.log(arr);
         //console.log("id="+arr._id);
    //loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <div>
 
    {/* <Header></Header>  */}
        {/* <Menu/> */}
    <div className='row'>
      <div className='col-md-1'></div>
      <div className='col-md-10'>
       
        

        <h2 className='mb-2 mt-4'>Best Sellers</h2>
        <div className='row'>
          {productsBySell.map((item, i) => (
            <div key={i} className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
              <div className='product-img' style={{ height: '250px' }}>
                <img
                  src={`http://localhost:8185/images/${item.filename}`}
                  alt={item.itemName}
                  className='mb-3'
                  style={{
                    objectFit: 'contain',
                    height: '100%',
                    width: '100%',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                />
              </div>
              <div className='py-2 flex flex-col gap-1'>
                <h2 className='cursor-pointer'>{item.itemName}</h2>
                <h2 className='text-center'>
                  ₹ <span className='text-red-500'>{item.itemPrice}</span>
                </h2>
              </div>
              <button className='btn btn-primary' onClick={() =>addToCart(item)}>Add to cart</button>
            </div>
          ))}
        </div>
      </div>
      <div className='col-md-1'></div>
    </div>
      </div>
   
  );
};

export default Home;
