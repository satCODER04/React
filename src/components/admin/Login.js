import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../UIElements/LoadingSpinner'
import { Modal, Button } from "react-bootstrap";
import { userLogin } from '../services/UsersService';
import { AuthContext } from '../../context/AuthContext';
import "./login.css";
const Login = () => {
  //create the variable for navigate
  const navigate=useNavigate();
  const { adminLogin } = useContext(AuthContext);
    //state to get the value of Email Id
  const [emailid, setEmail] = useState("");
    const [password, setPasword] = useState("");
    //for spinning buttton
    const [isLoading, setIsLoading] = useState(false);
    //for error
    const [errortxt, setErrortxt] = useState();
    //to show the modal poup
    const [show, setShow] = useState(false);
//to close the modal popup
    const handleClose = () => setShow(false);
    //to show the modal popup
    const handleShow = () => setShow(true);
    
  //to set the value of he email on change
    const inputHandler1 =(event)=>{
      setEmail(event.target.value);
        }
//to set the value of the password on change
        const inputHandler2 =(event)=>{
          setPasword(event.target.value);
            }
            //on submit calling api 
    const authSubmitHandler = async event => {
      
      event.preventDefault();
  
        try {
          setIsLoading(true);
  
      
            const response = await userLogin(emailid, password);
            console.log("User logged in:", response.data); // response.data is the Users object
         
        //const responseData=await response.json();
        if(response.status==200)//server error
        {
          const user = response.data;

      if (user.role === "Admin") {
        console.log("Admin logged in");
        // Redirect to admin dashboard
        localStorage.setItem("usertype","admin");
        adminLogin( user);
        navigate("/admin/");
      } else {
           // setErrortxt(response.data.message);
           setErrortxt("Invalid username & password");
        }
      }
        else
        {
            setErrortxt("Server Error");
           


            //handleShow();
        }
        setIsLoading(false);
  
        } catch (err) {
           console.log("error");
           console.log("Data ", err.response.message); 
           console.log("Status ", err.response.status); 
           console.log("Headers ", err.response.headers); 
           setIsLoading(false);
        //  setError(err.response.data.message || 'Something went wrong, please try again.');
         setErrortxt(err.response.data.message);
        //setIsModalOpen(true);
        } 
      if( errortxt!="")
        handleShow();
    };
  

    
  
    
    
    return (
        <div>
        <main class="form-signin">
  <form  onSubmit={authSubmitHandler}>
   
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
      onInput={inputHandler1}
      />
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
      onInput={inputHandler2}
      />
      <label for="floatingPassword">Password</label>
    </div>

    
    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
  </form>
</main>
      
       
    
  {isLoading && <LoadingSpinner asOverlay />}



 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errortxt}</Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        
        
  </div>
    );
  };
  
  export default Login;