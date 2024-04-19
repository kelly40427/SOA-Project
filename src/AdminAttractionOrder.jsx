import * as React from 'react';
import axios from 'axios';
import './AdminAttractionOrder.css';

export function AdminAttractionOrder() {
  // const [orders, setOrders] = React.useState([]);
  const [editingOrder, setEditingOrder] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({
      attractionName: '',
      date: '',
      status: '',
      price: '',
  });

  const [orders, setOrders] = React.useState([
    {
      id: 1,
      attractionName: 'Eiffel Tower Tour',
      date: '2024-04-20',
      status: 'confirmed',
      price: '49.99',
    },
    {
      id: 2,
      attractionName: 'Louvre Museum Visit',
      date: '2024-05-15',
      status: 'pending',
      price: '39.99',
    },
    // Add more orders as needed for your mockup
  ]);
     // React.useEffect(() =>{
    //     axios.get(`http://localhost:8080/attraction-order`).
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

    // Delete an order
    const deleteOrder = async (orderId) => {
      try {
          await axios.delete(`http://your-backend-url/api/attraction-orders/${orderId}`);
          setOrders(orders.filter((order) => order.id !== orderId));
      } catch (error) {
        console.error('Failed to update user', error);
      }
  };
  const startEdit = (order) => {
    setEditingOrder(order.id);
    setEditFormData({
        attractionName: order.attractionName,
        date: order.date,
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
        ...editingOrder,
        ...editFormData,
    };

    try {
        const response = await axios.put(`http://your-backend-url/api/attraction-orders/${editingOrder}`, updatedOrder);
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

  return (
    <div className='admin-attraction-order-container'> 
    <h2>Attraction Orders</h2>
    <form onSubmit={handleEditSubmit}>
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Attraction Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                        {editingOrder === order.id ? (
                            // Editable row
                            <>
                                <td>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter a name"
                                        name="attractionName"
                                        value={editFormData.attractionName}
                                        onChange={handleEditChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        required
                                        name="date"
                                        value={editFormData.date}
                                        onChange={handleEditChange}
                                    />
                                </td>
                                <td>
                                    <select
                                        name="status"
                                        value={editFormData.status}
                                        onChange={handleEditChange}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        required
                                        name="price"
                                        value={editFormData.price}
                                        onChange={handleEditChange}
                                    />
                                </td>
                                <td>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setEditingOrder(null)}>
                                        Cancel
                                    </button>
                                </td>
                            </>
                        ) : (
                            // Read-only row
                            <>
                                <td>{order.attractionName}</td>
                                <td>{order.date}</td>
                                <td>{order.status}</td>
                                <td>{order.price}</td>
                                <td>
                                    <button type="button" onClick={() => startEdit(order)}>Edit</button>
                                    <button type="button" onClick={() => deleteOrder(order.id)}>Delete</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    </form>
    {/* Other components such as delete confirmation modal, etc. */}
</div>
  )
}

export default AdminAttractionOrder