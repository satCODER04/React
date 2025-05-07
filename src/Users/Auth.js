import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import { Modal, Button } from "react-bootstrap";
import { createUsers } from '../components/services/UsersService';


const Auth = () => {
  const navigate=useNavigate();

  
  const [users,setUsers]=useState({name:'',emailid:'',password:'',role:'customer'})
  //create useState for Users
  const handleUsers=(e)=>{
   // console.log(e.target.name);
   // console.log(e.target.value);
    setUsers({ ...users, [e.target.name]: e.target.value });
  }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
    const [errortxt, setErrortxt] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
  const authSubmitHandler = async (event) => {
    event.preventDefault();
     
      try {
        setIsLoading(true);

        const response=await createUsers(users);
        if(response.status==200)
          {
      //const responseData=await response.json();
      navigate("/");
         localStorage.setItem("user",JSON.stringify( response.data));
         console.log(localStorage.getItem("user"));
          }
          else
          {

          }

      } catch (err) {
        console.log("error");
        console.log("Data ", err.response.data.message); 
        console.log("Status ", err.response.status); 
        ///console.log("Headers ", err.response.headers); 
        setIsLoading(false);
        setErrortxt(err.response.data.message || 'User with this email is already exits.');
      }
      if( errortxt!="")
        handleShow();
  

  };


  const errorHandler = () => {
    //console.log("hi");
    setError(null);
  };

  
  
  return (
    <div className="App"> 
   
  
{isLoading && <LoadingSpinner asOverlay />}
      <form class="form-signin" onSubmit={authSubmitHandler}>
      <fieldset> 
      <h2>Sign Up</h2> 
       
       <hr />
      <div className="Field"> 
           <label> 
             Full Name <sup>*</sup> 
           </label> 

          <input 
           class="form-control"
           placeholder="Full Name"
 
            id="name"
            name="name"
            value={users.name}
            type="text"
            label="Your Name"
            onChange={handleUsers}
          />
          </div>
          <div className="Field"> 
           <label> 
             Email ID <sup>*</sup> 
           </label> 
        <input
            class="form-control"
           placeholder="Enter Email"
          id="emailid"
          name="emailid"
          value={users.emailid}
          type="email"
          label="E-Mail"
          onChange={handleUsers}
          

          errorText="Please enter a valid email address."
        />
        </div>
        <div className="Field"> 
           <label> 
             Password <sup>*</sup> 
           </label> 
        <input
         class="form-control"
           placeholder="Password"
          id="password"
          type="password"
          value={users.password}
          name="password"
          label="Password"
          onChange={handleUsers}
        />

       </div>

         <button type="submit" class="mt-3 btn btn-lg btn-success btn-block">
       Register
      </button>
      </fieldset> 
      </form>
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

export default Auth;
