import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import {getCategories,deleteCategory} from "../services/CategoryService";
import axios from "axios";
function Category() {
    const navigate=useNavigate();
    
    let history = useNavigate();
    console.log("aaaa");
    const [categories, setCategories] = useState([]);

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
      fetchCategories();
    }
  };
        
    
 
    return (
        <div>
            <h1>Category</h1>
        
        <div class="mainleft">
    
            <Table className="table-image striped bordered hover" size="sm">
                <thead>
                    <tr>

                        <th>Name</th> <th>Description</th><th>&nbsp;</th><th>&nbsp;</th>
  
                    </tr>
                   
                </thead>
                <tbody>
                    {/* Mapping though every element 
                        in the array and showing the 
                        data in the form of table */}
                    {categories.map((category) => {
                        return (
                            <tr>
                               
                                <td>{category.catname}</td>
                           
                                <td>{category.catdesc}</td>
                                {/* getting theid,name, and 
                                    age for storing these
                                    value in the jsx with 
                                    onclick event */}
                                <td>
                                    <Link to={`/admin/category/edit/${category.catid}`}>
                                        <Button
                                            
                                            variant="info"
                                        >
                                            Update
                                        </Button>
                                    </Link>
                                </td>
 
                                {/* Using thr deleted function passing
                                    the id of an entry */}
                                <td>
                                    <Button
                                        onClick={(e) =>
                                            handleDelete(category.catid)
                                        }
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
 
            {/* Button for redirecting to create page for
                insertion of values */}
            <Link className="d-grid gap-2" to="/admin/category/create">
                <Button variant="warning" size="lg">
                    Create Category
                </Button>
            </Link>
        </div>
        </div>
    );
}
 
export default Category;