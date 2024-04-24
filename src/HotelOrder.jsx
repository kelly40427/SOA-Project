import * as React from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import './HotelOrder.css';

export function HotelOrder() {
  
  //获取登录页面传来的userId
  const location = useLocation();
  const userId = location.state.userId;
  console.log("User ID",userId);

  const navigate = useNavigate();
  const [orders, setOrders] = React.useState([]);
    // Simulated data for testing



  React.useEffect(()=>{
    axios.get(`http://localhost:8080/order/hotel/personal?userId=${userId}`).
    then((response)=> {
      console.log(response.data);
      if(response.data.code==0){
        setOrders(response.data.data)
      }
      else{
        console.log('No information found')
      }
    })
  }, [userId]);

  const handleConfirmOrder = (order) => {
    // Navigate to a different page or make a backend request with the orderId
    navigate('/hotel-confirm', { state: { 
      orderId: order.orderId, 
      userId: userId,
      checkIn:order.checkIn,
      checkOut: order.checkOut,
      price: order.price
       } });
  };

  return (
    <div className="order-list">
      <h1>Hotel Orders</h1>
      {orders.map((order) => (
        <div key={order.orderId} className="order-item">
          <div className="order-details">
          <h2>Order ID: {order.orderId}</h2>
            <p>Price: {order.price}</p>
            <p>Status: {order.orderStatus}</p>
            <p>Room ID: {order.roomId}</p>
            <p>Check-In Date: {order.checkIn}</p>
            <p>Check-Out Date: {order.checkOut}</p>
          </div>
          <button
            onClick={() => handleConfirmOrder(order)}
            className="confirm-button"
          >
            Confirm
          </button>
        </div>
      ))}
      <button onClick={() => navigate('/home', { state: { userId } })} className="home-button">
        Home
      </button>
    </div>
  );
}

export default HotelOrder