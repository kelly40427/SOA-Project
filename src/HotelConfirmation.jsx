import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HotelConfirmation.css';

function HotelConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state; // This contains the state passed when navigating
  const orderId = bookingData.orderId;

  // State hooks for form inputs
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
 
  // Function to handle booking confirmation
  const handleConfirmBooking = async () => {
    // Construct the order data
    const orderData = {
      order_id: orderId, // This would be assigned by the backend when creating the order

    };
    // navigate('/order-confirmation', { state: { orderId: orderId, name: name, email: email } });
    try {
      console.log(orderId);
      // Send a POST request to your backend endpoint to create the booking
      const response = await axios.post(`http://localhost:8080/order/hotel/confirm?orderId=${orderId}`);
      // Redirect to a confirmation page, passing along the orderId from the response
      navigate('/order-confirmation', { state: { orderId: orderId, name:name, email:email } });
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  return (
<div className="confirmation-container">
    <h1 className="header">Booking Confirmation</h1>
    <div className="details">
      <p>Check-In Date: {bookingData.checkIn}</p>
      <p>Check-Out Date: {bookingData.checkOut}</p>
      <p>Total Price: €{bookingData.price}</p>
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