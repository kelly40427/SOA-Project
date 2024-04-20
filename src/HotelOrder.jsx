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
  
  const getOrderStatus = (status) => {
    switch (status) {
      case 1:
        return 'Reserved';
      case 2:
        return 'Complete';
      default:
        return 'Unknown';
    }
  };
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

  // React.useEffect(() => {
  //   // Replace this URL with the actual endpoint of your backend service.
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/user/hotel-order?userId=${userId}`);
  //       if (response.data.code === 0) {
  //         const ordersWithHotelName = await Promise.all(
  //           response.data.data.map(async (order) => {
  //             // Fetch the hotel name for each order
  //             const hotelResponse = await axios.get(`http://localhost:8080/hotel/${order.hotel_id}`);
  //             return {
  //               ...order,
  //               hotelName: hotelResponse.data.data.name, // Assume the hotel name is in the response
  //             };
  //           })
  //         );
  //         setOrders(ordersWithHotelName);
  //       } else {
  //         console.log('No information found');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching orders:', error);
  //     }
  //   };
  
  //   fetchOrders();
  // }, [userId]);

  React.useEffect(() => {
    // 假設這些數據從後端接收
    const fakeData = [
      { order_id: 1, user_id: 1, room_id: 1, price: 90, order_status: 1, check_in: '2024-04-20', check_out: '2024-04-25' },
      // ... add other orders
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
                <h4 className="order-id">Order ID: {order.order_id}</h4>
                <p className="hotel-name">Hotel: {order.hotelName}</p>
                <p className="order-date">Check-in: {order.check_in} - Check-out: {order.check_out}</p>
                <p className="order-status">Status: {getOrderStatus(order.order_status)}</p>
                <p className="order-price">Price: €{order.price}</p>
            </div>
        </div>
    ))}
    <button onClick={() => navigate("/home", { state: { userId} })} className="home-button">Home</button>
</div>
  )
}

export default HotelOrder