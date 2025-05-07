import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteConfirmation from "../UIElements/DeleteConfirmation";
import {deleteItem, getItems} from"../services/ProductService";

import { getOrders } from "../services/ItemOrdersService";
function Orders() {
    const [orderDetails, setOrderDetails] = useState([]);
    const navigate=useNavigate();
        
        let history = useNavigate();
    
        const [items, setItems] = useState([]);
    //for delete confirmation
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState([]);
  const [id, setId] = useState(null);
// end for delete confirmation

//on page load
      useEffect(() => {
        fetchOrders();
      }, []);
 //get all the items from the server   
      const fetchOrders = async () => {
       try {
                       const response = await getOrders();
                       console.log("orders",response.data);
                       setOrderDetails(response.data);
                       console.log("orderdetails"+orderDetails.itemOrderDetails);
                   } catch (error) {
                       console.error('Error fetching order details:', error);
                   }
               };
    
      const handleDelete = async (id) => {
          if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteItem(id);
            fetchOrders();
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
           fetchOrders();
          } catch (err) {
             console.log("error");
             console.log("Data ", err.response.data.message); 
             console.log("Status ", err.response.status); 
      
          }
        }
      
        
    
 
    return (
        <div>
            <h1>Orders</h1>
        
        <div class="mainleft">
    
            <Table className="table-image striped bordered hover" size="sm">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapping though every element 
                        in the array and showing the 
                        data in the form of table */}
                    {orderDetails.map((orderDetail) => {
                        return (
                            <tr>
                                <td>
                                {orderDetail.orderid}
                                    
                                </td>
                                <td>{orderDetail.orderdate}</td>
                                <td>{orderDetail.users.name}</td>
                                <td>{orderDetail.users.emailid}</td>
                               
                                <td>₹{orderDetail.totalamount}</td>
                                <td>{orderDetail.status}</td>
                                {/* getting theid,name, and 
                                    age for storing these
                                    value in the jsx with 
                                    onclick event */}
                                <td>
                                    <Link to={`viewdetails/${orderDetail.orderid}`}>
                                        <Button
                                           
                                            variant="info"
                                        >
                                           View Details
                                           
                                        </Button>
                                    </Link>
                                    
                                </td>
 
                                
                                
                            </tr>
                        );
                    })}
                </tbody>
             <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal}  id={id} message={deleteMessage}  />  
            </Table>
 
           
           
        </div>
        </div>
    );
}
 
export default Orders;