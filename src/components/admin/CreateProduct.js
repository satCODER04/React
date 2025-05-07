import React, { useState,useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import {getCategories,deleteCategory} from "../services/CategoryService";
import {getItemById,createItem} from "../services/ProductService";
import axios from "axios";
function CreateProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({ itemName: '', itemPrice: '', category: { catid: '' }, filename: '' });
    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        console.log(e.target.name);
        if(e.target.name=== 'category.catid'){
            setProduct({
                ...product,
                category: {
                    ...product.category,
                    catid: e.target.value,
                },
            });
        }
        else
        {
        setProduct({ ...product, [e.target.name]: e.target.value });
        }
    };
    
            const handelSubmit = async (event) => {
              event.preventDefault();
                
                try {
          console.log(product)
            const response= await createItem(product);
                console.log(response);
               
                navigate("/admin/");
                //setIsLoading(false);
          
                } catch (err) {
                   console.log("error");
                   console.log("Data ", err.response.data.message); 
                   console.log("Status ", err.response.status); 
                   ///console.log("Headers ", err.response.headers); 
                   //setIsLoading(false);
                 //setError(err.response.data.message || 'Something went wrong, please try again.');
                 //setErrorMessage(err.response.data.message);
                //setIsModalOpen(true);
                }
            //else end    
              
          
            };
          
          
           
             // // Function to fetch data using Axios
    //fires on page load
    useEffect(() => {
        fetchCategories();
      }, []);
    
      const fetchCategories = async () => {
        try {
          const response = await getCategories();
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

 
    return (
        <div class="mainleft">
            <h1>Create Product</h1>
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
                    <Form.Select
                        onChange={handleChange}
                       name="category.catid"
                        value={product.category.catid}
                        placeholder="Enter Category"
                        required>
<option>Select category</option>
	 {categories.map((cat) => {
            return(
            <option value={cat.catid}>{cat.catname}</option>
            );
        })}

                        </Form.Select>
                    
                </Form.Group>
 
                <Form.Group
                    className="mb-3"
                    controlId="formBasicName"
                >
                    <Form.Control
                    name="itemName"
                        onChange={handleChange}
                        type="text"
                        value={product.itemName}
                        placeholder="Enter Name"
                        required
                    />
                </Form.Group>
                <Form.Control
                        onChange={handleChange}
                        name="itemPrice"
                        type="number"
                        value={product.itemPrice}
                        placeholder="Enter Product Price"
                        required
                    />
             
             <Form.Group
                    className="mb-3"
                    controlId="formBasicName"
                >
                    <Form.Control
                    name="filename"
                        onChange={handleChange}
                        type="text"
                        value={product.filename}
                        placeholder="Enter  File Name"
                        required
                    />
                </Form.Group>
               
               
                
                {/* handing a onclick event in button for
                    firing a function */}
                <Button
                   
                    variant="primary"
                    type="submit"
                    
                >
                    Submit
                </Button>
 
                {/* Redirecting back to home page  */}
                <Link className="d-grid gap-2" to="/admin/">
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}
 
export default CreateProduct;