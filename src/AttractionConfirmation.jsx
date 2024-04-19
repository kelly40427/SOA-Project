import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HotelConfirmation.css';
export function AttractionConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();

    const userId = location.state.userId;
    const orderId = location.state.orderId;
    const attractionName = location.state.attractionName;
    const visitDate = location.state.visitDate;
    const price = location.state.price;
    console.log('User ID:',userId, 'Order ID:',orderId)

      // State hooks for form inputs
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    // Function to handle booking confirmation
  const handleConfirmBooking = async () => {
    // Construct the order data
    const orderData = {
      orderId: orderId, // This would be assigned by the backend when creating the order
      // userId: userId,
      orderStatus: 1, // Assuming 1 is the status code for "reserved"
      name: name,
      email: email,
    };
    navigate('/order-confirmation', { state: { orderId: orderId, name: name, email: email } });
    // try {
    //   // Send a POST request to your backend endpoint to create the booking
    //   const response = await axios.patch('http://your-backend-url/api/orders/${orderId}', orderData);
    //   // Redirect to a confirmation page, passing along the orderId from the response
    //   navigate('/order-confirmation', { state: { orderId: response.data.orderId } });
    // } catch (error) {
    //   console.error('Error confirming booking:', error);
    // }
  };

  return (
    <div className="confirmation-container">
            <h1 className="header">Visit Confirmation</h1>
            <div className="details">
                <h1 className='attraction-name'>{attractionName}</h1>
                <p>Visit Date: {visitDate}</p>
                <p>Price: €{price.toFixed(2)}</p>
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
                    <button className="confirm-button" onClick={handleConfirmBooking}>Confirm Visit</button>
                </div>
            </div>
        </div>
  )
}

export default AttractionConfirmation