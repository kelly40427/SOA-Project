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

  // React.useEffect(()=>{
  //   axios.get(`http://localhost:8080/user/hotel-order?userId=${userId}`).
  //   then((response)=> {
  //     console.log(response.data);
  //     if(response.data.code==0){
  //       setOrders(response.data.data)
  //     }
  //     else{
  //       console.log('No information found')
  //     }
  //   })
  // }, [userId]);

  React.useEffect(() => {
    // 假設這些數據從後端接收
    const fakeData = [
      { orderId: '1', name: 'Hotel Ocean View', checkIn: '2024-04-20', checkOut: '2024-04-25', orderStatus: 'Confirmed', price: 120 },
      { orderId: '2', name: 'Mountain Resort Villa', checkIn: '2024-05-15', checkOut: '2024-05-20', orderStatus: 'Pending', price: 350 },
      { orderId: '3', name: 'City Center Hotel', checkIn: '2024-06-01', checkOut: '2024-06-03', orderStatus: 'Cancelled', price: 90 }
    ];

    // 模擬異步操作
    setTimeout(() => {
      setOrders(fakeData);
    }, 0);

  }, [userId]); // useEffect依賴userId來觸發

  return (
    <div className="order-list">
      <h1>Hotel Orders</h1>
    {orders.map((order) => (
        <div key={order.orderId} className="order-item">
            <div className="order-details">
                <h3 className="hotel-name">{order.name}</h3>
                <p className="order-date">Check-in: {order.checkIn} - Check-out: {order.checkOut}</p>
                <p className="order-status">Status: {order.orderStatus}</p>
                <p className="order-price">Price: €{order.price}</p>
            </div>
        </div>
    ))}
    <button onClick={() => navigate("/home", { state: { userId} })} className="home-button">Home</button>
</div>
  )
}

export default HotelOrder