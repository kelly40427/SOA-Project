import * as React from 'react';
import axios from 'axios';
import './AdminHotelOrder.css';
function EditableRow({ order, editFormData, handleEditChange, handleEditSubmit, setEditingOrder }) {

    return (
      <tr>
        <td>{editFormData.order_id}</td>
        <td>
        <input type="number" required name="user_id" value={editFormData.user_id} onChange={handleEditChange} readOnly />
        </td>
        <td>
        <input type="number" required name="room_id" value={editFormData.room_id} onChange={handleEditChange} />
        </td>
        <td>
        <input type="date" required name="checkIn" value={editFormData.check_in} onChange={handleEditChange}/>
        </td>
        <td>
          <input type="date" required name="checkOut" value={editFormData.check_out} onChange={handleEditChange}/>
        </td>

        <td>
          <select name="status" value={editFormData.order_status} onChange={handleEditChange}>
            <option value="pending">1</option>
            <option value="confirmed">2</option>
            <option value="cancelled">3</option>
          </select>
        </td>
        <td>
          <input type="text" required name="price" value={editFormData.price} onChange={handleEditChange} />
        </td>
        <td>
          <button type="button" onClick={handleEditSubmit}>Save</button>
          <button type="button" onClick={() => setEditingOrder(null)}>Cancel</button>
        </td>
      </tr>
    );
  }
  
  function ReadOnlyRow({ order, startEdit, deleteOrder }) {
    return (
      <tr>
        <td>{order.order_id}</td>
        <td>{order.user_id}</td>
        <td>{order.room_id}</td>
        <td>{order.check_in}</td>
        <td>{order.check_out}</td>
        <td>{order.order_status}</td>
        <td>{order.price}</td>
        {/* Include other fields similarly */}
        <td>
          <button type="button" onClick={() => startEdit(order)}>Edit</button>
          <button type="button" onClick={() => deleteOrder(order.id)}>Delete</button>
        </td>
      </tr>
    );
  }

export function AdminHotelOrder() {
    // const [orders, setOrders] = React.useState([]);
  const [editingOrder, setEditingOrder] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({
    orderId: '',
    roomType: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    status: '',
    price: '',
  });
  const [orders, setOrders] = React.useState([
    {
      "order_id": 1,
      "user_id": 101,
      "price": 499.99,
      "order_status": 1,
      "created_at": "2024-04-10 08:00:00",
      "updated_at": "2024-04-15 10:30:00",
      "room_id": 201,
      "check_in": "2024-04-20",
      "check_out": "2024-04-25"
    },
    {
      "order_id": 2,
      "user_id": 102,
      "price": 899.99,
      "order_status": 1,
      "created_at": "2024-04-12 09:15:00",
      "updated_at": "2024-04-15 11:45:00",
      "room_id": 202,
      "check_in": "2024-05-15",
      "check_out": "2024-05-20"
    },
    {
      "order_id": 3,
      "user_id": 103,
      "price": 699.99,
      "order_status": 2,
      "created_at": "2024-04-14 10:30:00",
      "updated_at": "2024-04-16 12:00:00",
      "room_id": 203,
      "check_in": "2024-06-01",
      "check_out": "2024-06-05"
    }
  ]);
     // React.useEffect(() =>{
    //     axios.get(`http://localhost:8080/hotel-order`).
    //     then((response)=> {
    //         console.log(response.data);
    //         if(response.data.code==0){
    //             setOrders(response.data.data);
    //         }
    //         else{
    //           console.log('No information found')
    //         }
    //       })
    // },[]);
    const startEdit = (order) => {
      setEditingOrder(order.order_id);
      setEditFormData({
        order_id: order.order_id,
        user_id: order.user_id.toString(),
        room_id: order.room_id.toString(),
        check_in: order.check_in,
        check_out: order.check_out,
        order_status: order.order_status,
        price: order.price.toString(),
      });
    };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const updatedOrder = {
      ...editFormData,
      user_id: parseInt(editFormData.user_id),
      room_id: parseInt(editFormData.room_id),
      price: parseFloat(editFormData.price),
    };

    try {
      const response = await axios.put(`http://your-backend-url/api/hotel-orders/${editFormData.order_id}`, updatedOrder);
      const newOrders = orders.map((order) => {
        if (order.order_id === editFormData.order_id) {
          return response.data;
        }
        return order;
      });
      setOrders(newOrders);
      setEditingOrder(null);
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://your-backend-url/api/hotel-orders/${orderId}`);
      setOrders(orders.filter((order) => order.order_id !== orderId));
    } catch (error) {
      console.error('Failed to delete order', error);
    }
  };

  return (
    <div className='admin-hotel-order-container'>
      <h2>Hotel Orders</h2>
      <form onSubmit={handleEditSubmit}>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th> {/* Updated from Hotel Name */}
              <th>Room ID</th> {/* Updated from Room Type */}
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th> {/* Removed Length of Stay */}
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              editingOrder === order.order_id ? // Use order_id to check if editing
                <EditableRow
                  key={order.order_id} // Correct key to order_id
                  order={order}
                  editFormData={editFormData}
                  handleEditChange={handleEditChange}
                  handleEditSubmit={() => handleEditSubmit(order.order_id)} // Pass the order_id for submission
                  setEditingOrder={setEditingOrder}
                />
                :
                <ReadOnlyRow
                  key={order.order_id} // Correct key to order_id
                  order={order}
                  startEdit={() => startEdit(order)} // Pass the entire order to start editing
                  deleteOrder={() => deleteOrder(order.order_id)} // Pass the order_id to delete the order
                />
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default AdminHotelOrder