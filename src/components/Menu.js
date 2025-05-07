import React, { useEffect, useState } from "react";
import { Link, useNavigate,Outlet } from "react-router-dom";

import { Navbar, Nav, Container,Badge} from 'react-bootstrap';
import { Logout } from "../Logout";
const Menu = ({ cartItems }) => {
    const totalItems = cartItems.reduce((acc, item) => acc + 1, 0);
   //const totalItems=0;
    console.log(cartItems);
    const [isUserLogin, setIsUserLogin] = useState(false);
    const navigate = useNavigate();
    console.log("users");
    
    const handleLogout = () => {
        // Clear local storage
        //console.log("hi")
        localStorage.clear();
        setIsUserLogin(true);
        // Optionally, navigate to the login page or home page
        navigate('/logout',{replace:true}); // Change this route based on your app's routing
      };
  useEffect(() => {
    if(localStorage.getItem("user")!==null)
      {
        setIsUserLogin(true);
      }
  }, []);
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand has={Link} to="/">Shopping Cart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link  as={Link} to="/">Home</Nav.Link>
            
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            
           
      {isUserLogin && (
     <Nav.Link as={Link} to={`/logout`}>Logout</Nav.Link>
      )}
      {!isUserLogin && (
      <Nav.Link as={Link} to={`/login`}>Login</Nav.Link>
     
      )}
      {!isUserLogin && (
        <Nav.Link as={Link} to={`/admin`}>Admin Login</Nav.Link>
      )}
        {!isUserLogin && (
        <Nav.Link as={Link} to={`/signup`}>Sign-up</Nav.Link>
      )}
       <Nav.Link as={Link} to="/cart">Cart&nbsp;&nbsp;
            {totalItems > 0 && (
              <Badge pill bg="success" className="ml-2">
                {totalItems}
              </Badge>
            )}
              </Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;