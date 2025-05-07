// Filename - App.js

import React, { useState, useEffect,useContext } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,Link
} from "react-router-dom";
import "./App.css";
import Create from "./components/admin/CreateProduct";
import Edit from "./components/admin/EditProduct";
import EditCategory from "./components/admin/EditCategory";
import Home from "./components/admin/Home";
import Login from "./components/admin/Login"
import Dashboard from "./components/admin/Dashboard";
import Header from "./components/Header";
import MainHome from "./components/MainHome";
import UserLogin from "./Users/UserLogin";
import Auth from "./Users/Auth";
import { Logout } from "./Logout";
import Cart from "./components/Cart";
import Category from './components/admin/Category';
import CreateCategory from './components/admin/CreateCategory';
import PaymentSuccessPage from './components/PaymentSuccessPage';
import Menu from './components/Menu';
import EditProduct from './components/admin/EditProduct';
import { ToastContainer, toast } from 'react-toastify';
import Orders from './components/admin/Orders';
import { AuthContext } from './context/AuthContext';
function App() {
	const notify = () => toast("Wow so easy!");
	const [cartItems, setCartItems] = useState([]);

	const { isAdminLogin } = useContext(AuthContext);  

	useEffect(() => {
	  const userType = localStorage.getItem("usertype");
	  
	  
	  
	}, []);
// Save cart to localStorage on cartItems update
// useEffect(() => {
// 	localStorage.setItem("cartItems", JSON.stringify(cartItems));
// 	console.log("Cart updated:", cartItems);
// }, [cartItems]);
	// Function to add a product to the cart
	const addToCart = (product) => {
		console.log("cart item",product);
		const existingItem = cartItems.find((item) => item.itemId === product.itemId);
	
		if (existingItem) {
		  setCartItems(
			cartItems.map((item) =>
				item.itemId === product.itemId ? { ...item, quantity: item.quantity + 1 } : item
			)
		  );
		} else {
		  setCartItems([...cartItems, { ...product, quantity: 1 }]);
		}
		//console.log('Updated Cart Items:', cartItems);

		//toast("Item added succefully to cart");
		toast.success('✨ Item added succefully to cart', {
			position: "top-right",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored"

			});
	  };
  // Function to update the quantity of an item in the cart
  const updateCartItem = (productId, quantity) => {
    setCartItems((prevCart) =>
      prevCart.map(item =>
        item.itemId === productId ? { ...item, quantity } : item
      )
    );
  };
  const clearCart = () => {
	setCartItems([]); // Reset the cart to an empty array
};
  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevCart) => prevCart.filter(item => item.itemId !== productId));
  };
	// Log the cart state whenever it updates
	 useEffect(() => {
	   //console.log('Cart updated:', cartItems);
	 }, [cartItems]);
	return (
		
		<div className="App">
			
			<Router>
			{/* <Menu cartItems={cartItems}/>  */}
      {/* <nav>
        <Link to="/">Products</Link> |{" "}
        <Link to="/cart">Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</Link>
      </nav> */}
	  
	 

 {!isAdminLogin&&(<Header/>)}
      <Routes>
	
        <Route path="/" element={<MainHome addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems1={cartItems} removeFromCart={removeFromCart} 
                    updateQuantity={updateCartItem} clearCart={clearCart} />} />
					<Route path="/payment-success/:orderId" element={<PaymentSuccessPage />} />
      
	  <Route
						path="/login"
						element={<UserLogin />}
					/>

	  <Route
						path="/logout"
						element={<Logout />}
					/>
					<Route
						path="/signup"
						element={<Auth />}
					/>
					
					<Route path="/admin" element={<Dashboard />} >
					<Route
						path="/admin/"
						element={<Home />}
					/>
					<Route
						path="/admin/orders"
						element={<Orders />}
					/>
					<Route
						path="/admin/category"
						element={<Category />}
					/>
					<Route
						path="/admin/category/create"
						element={<CreateCategory />}
					/>
					<Route
						path="/admin/category/edit/:id"
						element={<EditCategory />}
					/>
					<Route
						path="/admin/product"
						element={<Home />}
					/>
					<Route
						path="/admin/product/create"
						element={<Create />}
					/>
					<Route
						path="/admin/product/edit/:id"
						element={<EditProduct />}
					/>
					</Route>
					<Route
						path="/admin/login"
						element={<Login/>}
					/>
					{/*
					<Route
						path="/about"
						element={<AboutUs />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/register"
						element={<Registration />}
					/>
					*/}
				
				</Routes>
    </Router>
	<ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"

/>
		</div>
	);
}

export default App;
