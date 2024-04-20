import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HotelConfirmation.css';

function HotelConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state.userId;
  const orderId = location.state.orderId;
  const hotelId = location.state.hotelId;
  const roomId = location.state.roomId;
  const checkInDate = location.state.checkInDate;
  const checkOutDate = location.state.checkOutDate;
  const lengthOfStay = location.state.lengthOfStay;
  const roomType = location.state.roomType;
  const totalPrice = location.state.totalPrice;
  console.log('User ID:',userId, 'Order ID:',orderId,)

  // State hooks for form inputs
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
 
  // Function to handle booking confirmation
  const handleConfirmBooking = async () => {
    // Construct the order data
    const orderData = {
      order_id: orderId, // This would be assigned by the backend when creating the order
      // userId: userId,
      // hotelId: hotelId,
      // price: totalPrice,
      order_status: 2, // Assuming 1 is the status code for "reserved"
      // roomId: roomId,
      // checkIn: checkInDate,
      // checkOut: checkOutDate,
      name: name,
      email: email,
    };
    navigate('/order-confirmation', { state: { orderId: orderId, name: name, email: email } });
    // try {
    //   // Send a POST request to your backend endpoint to create the booking
    //   const response = await axios.patch('http://your-backend-url/api/orders/${orderId}', orderData);
    //   // Redirect to a confirmation page, passing along the orderId from the response
    //   navigate('/order-confirmation', { state: { orderId: response.data.data.order_id } });
    // } catch (error) {
    //   console.error('Error confirming booking:', error);
    // }
  };

  return (
<div className="confirmation-container">
    <h1 className="header">Booking Confirmation</h1>
    <div className="details">
      <p>Check-In Date: {checkInDate}</p>
      <p>Check-Out Date: {checkOutDate}</p>
      <p>Room Type: {roomType}</p>
      <p>Length of Stay: {lengthOfStay} nights</p>
      <p>Total Price: €{totalPrice.toFixed(2)}</p>
    </div>
    <div className="form">
      <div className="input-group">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleConfirmBooking}>Confirm</button>
      </div>
    </div>
  </div>
  )
}

export default HotelConfirmation