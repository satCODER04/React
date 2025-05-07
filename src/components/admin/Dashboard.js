import Home from './Home';
import React,{useEffect} from "react";
import { Outlet, Link,useNavigate } from 'react-router-dom';

import './dashboard.css';
const Dashboard=()=>{

    const navigate = useNavigate();
    console.log("users"+localStorage.getItem("usertype"));
    
    const handleLogout = () => {
        // Clear local storage
        localStorage.clear();
    
        // Optionally, navigate to the login page or home page
        navigate('/admin/login'); // Change this route based on your app's routing
      };
      useEffect(() => {
        // Check if 'usertype' is null
        if (localStorage.getItem("usertype") === null) {
          navigate('/admin/login'); // Redirect to login page
        }
      }, [navigate]);
return(
    <div>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
  <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
  <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
  <div class="navbar-nav">
    <div class="nav-item text-nowrap">
      <a class="nav-link px-3" href="#" onClick={handleLogout}>Log out</a>
    </div>
  </div>
</header>
<div class="container-fluid">
  <div class="row">
    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
          <Link to="category" class="nav-link" >
              <span data-feather="home"></span>
              Dashboard
            </Link>
          </li>
          <li class="nav-item">
            <Link to="category" class="nav-link">
              <span data-feather="file"></span>
              Categorys
            </Link>
          </li>
          <li class="nav-item">
          <Link to="orders" class="nav-link" >
              <span data-feather="file"></span>
              Orders
            </Link>
          </li>
          <li class="nav-item">
          <Link to="product" class="nav-link" >
              <span data-feather="shopping-cart"></span>
              Products
           </Link>
          </li>
          <li class="nav-item">
          <Link to="customers" class="nav-link" >
              <span data-feather="users"></span>
              Customers
          </Link>
          </li>
          <li class="nav-item">
          <Link to="payment" class="nav-link" >
              <span data-feather="bar-chart-2"></span>
              Payment
            </Link>
          </li>
          
        </ul>

       
      </div>
    </nav>
    <main>
        <Outlet /> {/* This is where nested routes will render */}
      </main>
</div>   

 </div>
   




</div>

);
}
export  default Dashboard;