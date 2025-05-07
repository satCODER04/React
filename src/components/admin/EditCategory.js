// Filename - Edit.js
import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import { Button, Form,Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {updateCategory,getCategoryById} from "../services/CategoryService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function EditCategory() {
//get the value from parameter
	const { id } = useParams();
	const [category, setCategory] = useState({catid:0, catname: '', catdesc: '' });
	
	// Used for navigation with logic in javascript
	let history = useNavigate();
const navigate=useNavigate();

const handleChange = (e) => {
	setCategory({ ...category, [e.target.name]: e.target.value });
}

const handelSubmit = async (e) => {
	e.preventDefault();
	console.log(category)
	await updateCategory(category);
	navigate("/admin/category/");
}
  
               
          
            

	// Useeffect take care that page will
	// be rendered only once

	const fetchData = async () => {
		const response = await getCategoryById(id);
        console.log(response.data);
        setCategory(response.data);
     }
     useEffect(() => {
	
		
        fetchData();
    }, []);

	return (
		<div class="mainleft">
			<h1>Edit Category</h1>
			<Form
				className="d-grid gap-2"
				style={{ margin: "5rem" }}
				onSubmit={handelSubmit}
			>
				
				<Form.Group
					className="mb-3"
					controlId="formBasicEmail"
				>
					<Form.Control
					name="catname"
						value={category.catname} onChange={handleChange}
						type="text"
						placeholder="Enter Name"
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

				{/* Hadinling an onclick event 
					running an edit logic */}
				<Button
					
					variant="primary"
					type="submit"
					size="lg"
				>
					Update
				</Button>

				
				
			</Form>
		</div>
	);
}

export default EditCategory;
