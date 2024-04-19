import * as React from 'react';
import axios from 'axios';
import './AdminHotelOrder.css';
function EditableRow({ order, editFormData, handleEditChange, handleEditSubmit, setEditingOrder }) {
    return (
      <tr>
        <td>{order.id}</td>
        <td>
          <input type="text" required name="hotelName" value={editFormData.hotelName} onChange={handleEditChange} />
        </td>
        <td>
          <select name="roomType" value={editFormData.roomType} onChange={handleEditChange}>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
            <option value="deluxe">Deluxe</option>
          </select>
        </td>
        {/* Include other fields similarly */}
        <td>
        <input type="date" required name="checkIn" value={editFormData.checkIn} onChange={handleEditChange}/>
        </td>
        <td>
          <input type="date" required name="checkOut" value={editFormData.checkOut} onChange={handleEditChange}/>
        </td>
        <td>
          <input type="text" required name="lengthOfStay" value={editFormData.lengthOfStay} onChange={handleEditChange} />
        </td>
        <td>
          <select name="status" value={editFormData.status} onChange={handleEditChange}>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
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
        <td>{order.id}</td>
        <td>{order.hotelName}</td>
        <td>{order.roomType}</td>
        <td>{order.checkIn}</td>
        <td>{order.checkOut}</td>
        <td>{order.lengthOfStay}</td>
        <td>{order.status}</td>
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
    hotelName: '',
    roomType: '',
    checkIn: '',
    checkOut: '',
    lengthOfStay: '',
    status: '',
    price: '',
  });
  const [orders, setOrders] = React.useState([
    {
      id: 1,
      hotelName: 'Grand Plaza',
      roomType: 'Deluxe',
      checkIn: '2024-04-20',
      checkOut: '2024-04-25',
      lengthOfStay: 5,
      status: 'confirmed',
      price: '499.99',
    },
    {
      id: 2,
      hotelName: 'Ocean View',
      roomType: 'Single',
      checkIn: '2024-05-15',
      checkOut: '2024-05-20',
      lengthOfStay: 5,
      status: 'pending',
      price: '899.99',
    },
    // Add more orders as needed
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
    setEditingOrder(order.id);
    setEditFormData({
      hotelName: order.hotelName,
      roomType: order.roomType,
      checkIn: order.checkIn,
      checkOut: order.checkOut,
      lengthOfStay: order.lengthOfStay,
      status: order.status,
      price: order.price,
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const updatedOrder = {
      id: editingOrder,
      ...editFormData,
    };

    try {
      const response = await axios.put(`http://your-backend-url/api/hotel-orders/${editingOrder}`, updatedOrder);
      const newOrders = orders.map((order) => {
        if (order.id === editingOrder) {
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
      setOrders(orders.filter((order) => order.id !== orderId));
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
              <th>Hotel Name</th>
              <th>Room Type</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Length of Stay</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
                        {orders.map((order) => (
                            editingOrder === order.id ?
                                <EditableRow
                                    key={order.id}
                                    order={order}
                                    editFormData={editFormData}
                                    handleEditChange={handleEditChange}
                                    handleEditSubmit={handleEditSubmit}
                                    setEditingOrder={setEditingOrder}  // Here is the passed function
                                />
                                :
                                <ReadOnlyRow
                                    key={order.id}
                                    order={order}
                                    startEdit={startEdit}
                                    deleteOrder={deleteOrder}
                                />
                        ))}
                    </tbody>
        </table>
      </form>
    </div>
  );
}

export default AdminHotelOrder