import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderConfirmation.css'

export function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();

    const orderId = location.state.orderId;
    const name = location.state.name;
    const email = location.state.email;
    console.log('Order ID:',orderId, 'Name:',name,'Email:',email);
  return (
    <div className="orderconfirm-container">
    <img src="/checked.png" alt="Order Confirmed" className="checkmark-image" />
    <h1 className="header">Thank you for your order, {name}!</h1>
    <p>Your confirmation number is: {orderId}</p>
    <p>A confirmation email has been sent to: {email}</p>
    <button className="button" onClick={() => navigate('/home')}>Home</button>
</div>
  )
}

export default OrderConfirmation