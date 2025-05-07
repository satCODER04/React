// Filename - Edit.js
import React, { useEffect, useState } from "react";
import { Button, Form,Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {getItemById,updateItem,getItems} from "../services/ProductService";
import {getCategories,deleteCategory} from "../services/CategoryService";
import { Link } from "react-router-dom";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
function EditProduct() {
const { id } = useParams();
	const [product, setProduct] = useState({ itemid:0,itemName: '', itemPrice: '', category: { catid: '' }, filename: '' });
		const [categories, setCategories] = useState([]);
	// Here usestate has been used in order
	// to set and get values from the jsx
	
	// Used for navigation with logic in javascript
	let history = useNavigate();
const navigate=useNavigate();
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
	const handelSubmit =async (event) => {
		event.preventDefault();
		console.log(product)
		await updateItem(product);
		navigate("/admin/");
              
                
                
            };

	// Useeffect take care that page will
	// be rendered only once

	 useEffect(() => {
			fetchCategories();
			fetchItemById();
		  }, []);
		const fetchItemById= async () => {
				const response = await getItemById(id);
				console.log(response.data);
				setProduct(response.data);
			 }

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
			<h1>Edit Product</h1>
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
								Update
							</Button>

				{/* Redirecting to main page after editing */}
				<Link className="d-grid gap-2" to="/admin/">
					<Button variant="warning" size="lg">
						Home
					</Button>
				</Link>
			</Form>
		</div>
	);
}

export default EditProduct;
