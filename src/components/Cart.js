import React,{useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createOrders } from './services/ItemOrdersService';
import { createOrders1 } from './services/PaymentService';
import { paymentConfirm} from './services/PaymentService';
import CartItem from './CartItem';
import axios from 'axios';
import Menu from './Menu';
import Header from './Header';
const Cart = ({ cartItems1, removeFromCart, updateQuantity ,clearCart}) => {
  const navigate = useNavigate();
  console.log('Cart Items:', cartItems1);
  console.log("users"+localStorage.getItem("user"));
  //let users=JSON.parse(localStorage.getItem("user"));
 // console.log("users"+users.userid);
  const total = cartItems1.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
  //const [orders,setOrders]=useState[{orderdate:'',totalamount:0,users:{userid:''}}];
//const
const handlePayment = async () => {
  // Step 1: Call your backend to create Razorpay order
  let users=JSON.parse(localStorage.getItem("user"));
      console.log("users"+users);
      const orders={'totalamount':total,'userid':users.userid,'items':cartItems1};
  
    const response=await createOrders1(orders)
  const order = response.data;
  console.log(order);
  // Step 2: Open Razorpay Checkout with returned Razorpay Order ID
  const options = {
    key: "rzp_test_qDAV8sCeGjU7AR", // from Razorpay dashboard
    amount: order.totalamount * 100,
    currency: "INR",
    name: cartItems1.itemName,
    description: "Order Payment",
    order_id: order.razorpayOrderId,
    handler: async function (response) {
      //const res= JSON.stringify(response, null, 2);
      // Step 3: Send payment confirmation to backend
      console.log("Raw response:", response);
      const confirmData = {
        razorpayOrderId: response.razorpay_order_id,
        razorpayPaymentId: response.razorpay_payment_id
      };
console.log("confirm data",confirmData);
      const confirmResponse = await paymentConfirm(confirmData);

      alert("Payment successful!");
      console.log(confirmResponse.data);
      navigate(`/payment-success/${order.orderid}`);
      clearCart={clearCart};
    },
    prefill: {
      name: users.name,
      email: users.emailid
    },
    theme: {
      color: "#3399cc"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const placeOrder =async () => {
    console.log("users"+localStorage.getItem("user"));
    if(localStorage.getItem("user")===null)
    {
      navigate(`/login`);
      return;
    }
    try{
      let users=JSON.parse(localStorage.getItem("user"));
      console.log("users"+users);
      const orders={'totalamount':total,'userid':users.userid,'items':cartItems1};
  console.log(orders);
    const response=await createOrders(orders)
     console.log(orders);
     console.log(response);
      const { orderid } = response.data;
      console.log("orderid"+orderid);
     
      navigate(`/payment-success/${orderid}`);
      clearCart={clearCart};
    }
    catch(err)
    {

    }
      
    }



    



  return (
    <div>
       {/* <Header></Header> */}
      <h3>Your Cart</h3>
      <ListGroup>
        {cartItems1.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems1.map((item) => (
            <CartItem
              key={item.itemid}
              item={item}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          ))
        )}
      </ListGroup>
      <h4>Total: Rs{total.toFixed(2)}</h4>
      <h2><button onClick={placeOrder} class="btn btn-danger btn-sm">Place Orders</button></h2>
      <h2><button onClick={handlePayment} class="btn btn-danger btn-sm">Place Orders with payment</button></h2>
    </div>
  );
};

export default Cart;
