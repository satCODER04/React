import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";

import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import { userLogin } from '../components/services/UsersService';
import { AuthContext } from '../context/AuthContext'; 

const UserLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errortxt, setErrorText] = useState('');
  const [show, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const inputHandler1 = (e) => setEmail(e.target.value);
  const inputHandler2 = (e) => setPassword(e.target.value);

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await userLogin(email, password);
      console.log("Login response:", response);

      if (response.status === 200) {
        if (response.data === "") {
          setErrorText("Invalid username or password");
          handleShowModal();
        } else {
          const user = response.data;

      if (user.role === "customer")
      {
          localStorage.setItem("user", JSON.stringify(response.data));
          login(response.data);
          navigate("/", { replace: true });
      }
      else
      {
        setErrorText("Invalid username or password");
          handleShowModal();
      }
        }
      } else {
        setErrorText("Invalid username or password");
        handleShowModal();
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorText("Invalid username or password");
      handleShowModal();
    }

    setIsLoading(false);
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

export default UserLogin;
