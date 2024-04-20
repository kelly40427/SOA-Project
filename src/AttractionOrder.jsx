import * as React from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import './AttractionOrder.css'

export function AttractionOrder() {
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
    React.useEffect(() => {
      const fetchOrdersAndAttractions = async () => {
        try {
          // Fetch the user's orders
          const orderResponse = await axios.get(`http://localhost:8080/user/attraction-order?userId=${userId}`);
          if (orderResponse.data.code === 0) {
            const orders = orderResponse.data.data;
            
            // Fetch the attraction names for all the orders
            const attractionIds = orders.map(o => o.attraction_id);
            const attractionResponse = await axios.get(`http://localhost:8080/attractions?ids=${attractionIds.join(',')}`);
            
            if (attractionResponse.data.code === 0) {
              // Transform array of attractions to a map for easy access
              const attractionMap = attractionResponse.data.data.reduce((map, attraction) => {
                map[attraction.attraction_id] = attraction.name;
                return map;
              }, {});
    
              // Map over orders to include attraction names
              const ordersWithAttractionNames = orders.map(order => ({
                ...order,
                attractionName: attractionMap[order.attraction_id],
              }));
    
              setOrders(ordersWithAttractionNames);
            }
          }
        } catch (error) {
          console.error('Error fetching orders or attractions:', error);
        }
      };
    
      fetchOrdersAndAttractions();
    }, [userId]);

    // React.useEffect(()=>{
  //   axios.get(`http://localhost:8080/user/attraction-order?userId=${userId}`).
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
      { orderId: '1', name: 'Museum 213', date:'2024-05-11', orderStatus: 'Confirmed', price: 120 },
      { orderId: '2', name: 'Park', date: '2024-05-15', orderStatus: 'Pending', price: 350 },
      { orderId: '3', name: 'Church', date: '2024-06-01', orderStatus: 'Cancelled', price: 90 }
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
                <h3 className="order-id">Order ID: {order.order_id}</h3>
                <h3 className="attraction-name">Attraction: {order.attractionName}</h3>
                <p className="order-date">Date: {order.visit_date}</p>
                <p className="order-status">Status: {getOrderStatus(order.order_status)}</p>
                <p className="order-price">Price: €{order.price}</p>
            </div>
        </div>
    ))}
    <button onClick={() => navigate("/home", { state: { userId} })} className="home-button">Home</button>
</div>
  )
}

export default AttractionOrder