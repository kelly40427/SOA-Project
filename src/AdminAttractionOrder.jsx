import * as React from 'react';
import axios from 'axios';
import './AdminAttractionOrder.css';

export function AdminAttractionOrder() {
  // const [orders, setOrders] = React.useState([]);
  const [editingOrder, setEditingOrder] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({
        order_id: '',
        user_id: '',
        attraction_id: '',
        visit_date: '',
        order_status: '',
        price: '',
        visitors_number: '', // Newly added field
  });

  const [orders, setOrders] = React.useState([
    {
      order_id: 1,
      user_id: 101,
      attraction_id: 301,
      visit_date: '2024-04-20',
      order_status: 1,
      price: 49.99,
      visitors_number: 2, // Newly added field
    },
    {
      order_id: 2,
      user_id: 102,
      attraction_id: 302,
      visit_date: '2024-05-15',
      order_status: 2,
      price: 39.99,
      visitors_number: 10, // Newly added field
    },
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

    const deleteOrder = async (orderId) => {
        try {
          await axios.delete(`http://your-backend-url/api/attraction-orders/${orderId}`);
          setOrders(orders.filter((order) => order.order_id !== orderId)); // Corrected field name
        } catch (error) {
          console.error('Failed to delete order', error);
        }
      };
    
      const startEdit = (order) => {
        setEditingOrder(order.order_id); // Corrected field name
        setEditFormData({
          order_id: order.order_id,
          user_id: order.user_id.toString(),
          attraction_id: order.attraction_id.toString(),
          visit_date: order.visit_date,
          order_status: order.order_status,
          price: order.price.toString(),
          visitors_number: order.visitors_number.toString(),
        });
      };
    
      const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
      };
    
      const handleEditSubmit = async (event) => {
        event.preventDefault();
        const updatedOrder = {
          order_id: editingOrder, // Corrected field name
          user_id: parseInt(editFormData.user_id),
          attraction_id: parseInt(editFormData.attraction_id),
          visit_date: editFormData.visit_date,
          order_status: editFormData.order_status,
          price: parseFloat(editFormData.price),
          visitors_number: parseInt(editFormData.visitors_number), // Added field
        };
    
        try {
          const response = await axios.put(
            `http://your-backend-url/api/attraction-orders/${editingOrder}`,
            updatedOrder
          );
          const newOrders = orders.map((order) => {
            if (order.order_id === editingOrder) {
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
                  <th>User ID</th>
                  <th>Attraction ID</th>
                  <th>Visit Date</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Visitors Number</th> {/* New header */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    {editingOrder === order.order_id ? (
                      <>
                        <td>{editFormData.user_id}</td> {/* Read-only */}
                        <td>
                          <input
                            type="text"
                            required
                            name="attraction_id"
                            value={editFormData.attraction_id}
                            onChange={handleEditChange}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            required
                            name="visit_date"
                            value={editFormData.visit_date}
                            onChange={handleEditChange}
                          />
                        </td>
                        <td>
                          <select
                            name="order_status"
                            value={editFormData.order_status}
                            onChange={handleEditChange}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
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
                          <input
                            type="number"
                            required
                            name="visitors_number"
                            value={editFormData.visitors_number}
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
                      <>
                        <td>{order.user_id}</td>
                        <td>{order.attraction_id}</td>
                        <td>{order.visit_date}</td>
                        <td>{order.order_status}</td>
                        <td>{order.price}</td>
                        <td>{order.visitors_number}</td>
                        <td>
                          <button type="button" onClick={() => startEdit(order)}>Edit</button>
                          <button type="button" onClick={() => deleteOrder(order.order_id)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      );
}

export default AdminAttractionOrder