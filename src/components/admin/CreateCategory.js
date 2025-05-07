import React, { useState} from "react";
import { Button, Form,Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from '../UIElements/LoadingSpinner'
import {createCategory} from "../services/CategoryService";
import axios from "axios";
function CreateCategory() {
    const navigate = useNavigate();
    const [category, setCategory] = useState({ catname: '', catdesc: '' });
    const handleChange = (e) => {
        console.log(e.target.name);
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    
    const [isLoading, setIsLoading] = useState(false);
    const [errortxt, setErrortxt] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
            const handelSubmit = async (event) => {
                setIsLoading(true);
              event.preventDefault();
                
                try {
          
           const response= await createCategory(category);
    
        if(response.status==200)
            {
      
                console.log(response);
                setCategory("");
                navigate("/admin/category/");
                //setIsLoading(false);
            }
            else
            {
                setErrortxt(response.data.message);
            }
            setIsLoading(false);
                } catch (err) {
                  
                   setErrortxt(err.response.data.message);
                 
                   setIsLoading(false);
                
                }
                if( errortxt!="")
                    handleShow();
            //else end    
              
          
            };
          
          
            
 
    return (
        <div class="mainleft">
            <h1>Create Category</h1>
            <Form
                className="d-grid gap-2"
                style={{ margin: "5rem" }}
                onSubmit={handelSubmit}
            >
                {/* Fetching a value from input textfirld 
                    in a setname using usestate*/}
                <Form.Group
                    className="mb-3"
                    controlId="formBasicName"
                >
                    <Form.Control
                    name="catname"
                        onChange={handleChange}
                        type="text"
                        value={category.catname}
                        placeholder="Enter Category Name"
                        required
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="formBasicName"
                >
                    <Form.Control
                    name="catdesc"
                        onChange={handleChange}
                        type="text"
                        value={category.catdesc} 
                        placeholder="Enter Category Description"
                        required
                    />
                </Form.Group>
                {/* Fetching a value from input textfirld in
                    a setage using usestate*/}
                
               
                
                {/* handing a onclick event in button for
                    firing a function */}
                <Button
                   
                    variant="primary"
                    type="submit"
                    
                >
                    Submit
                </Button>
 
                {/* Redirecting back to home page  */}
                <Link className="d-grid gap-2" to="/">
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
      
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
}
 
export default CreateCategory;