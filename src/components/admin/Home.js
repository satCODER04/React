import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteConfirmation from "../UIElements/DeleteConfirmation";
import {deleteItem, getItems} from"../services/ProductService";
function Home() {
    
    const navigate=useNavigate();
        
        let history = useNavigate();
    
        const [items, setItems] = useState([]);
    //for delete confirmation
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [id, setId] = useState(null);
// end for delete confirmation

//on page load
      useEffect(() => {
        fetchItems();
      }, []);
 //get all the items from the server   
      const fetchItems = async () => {
        try {
          const response = await getItems();
          setItems(response.data);
        } catch (error) {
          console.error("Error fetching Items:", error);
        }
      };
    
      const handleDelete = async (id) => {
          if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteItem(id);
            fetchItems();
          }
        };

 // Handle the displaying of the modal based on type and id
const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage('Are you sure you want to delete this record ?');
    setDisplayConfirmationModal(true);
  };
  const submitDelete = (id) => {
    deleted(id)
    setDisplayConfirmationModal(false);
  };
  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };
    // Deleted function - functionality
    // for deleting the entry
    async function  deleted(id) {
        try {

           await deleteItem(id);
           fetchItems();
          } catch (err) {
             console.log("error");
             console.log("Data ", err.response.data.message); 
             console.log("Status ", err.response.status); 
      
          }
        }
      
        
    
 
    return (
        <div>
            <h1>Product</h1>
        
        <div class="mainleft">
    
            <Table className="table-image striped bordered hover" size="sm">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping though every element 
                        in the array and showing the 
                        data in the form of table */}
                    {items.map((item) => {
                        return (
                            <tr>
                                <td>
                                 <img class="table-imagesize" src={`http://localhost:8185/images/${item.filename}`}/> 
                                    
                                </td>
                                <td>{item.category.catname}</td>
                                <td>{item.itemName}</td>
                                <td>{item.description}</td>
                                <td>₹{item.itemPrice}</td>
 
                                {/* getting theid,name, and 
                                    age for storing these
                                    value in the jsx with 
                                    onclick event */}
                                <td>
                                    <Link to={`/admin/product/edit/${item.itemId}`}>
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
                                            showDeleteModal(item.itemId)
                                        }
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>
                                    {/* <FontAwesomeIcon icon={faTrash} className="text-danger cursor" onClick={() => showDeleteModal(item.itemid)} /> */}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
             <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal}  id={id} message={deleteMessage}  />  
            </Table>
 
            {/* Button for redirecting to create page for
                insertion of values */}
            <Link className="d-grid gap-2" to="/admin/product/create">
                <Button variant="warning" size="lg">
                    Create
                </Button>
            </Link>
        </div>
        </div>
    );
}
 
export default Home;