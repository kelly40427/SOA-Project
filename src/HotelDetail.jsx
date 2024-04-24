import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HotelDetail.css';

export function HotelDetail() {
    const location = useLocation();
    const bookingData = location.state; 
    const { userId,checkInDate, checkOutDate} = bookingData; 
    const navigate = useNavigate(); 
    // Convert checkInDate and checkOutDate to Date objects if they aren't already
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Convert the `Date` objects to strings in a readable format
    const checkInFormatted = new Date(checkInDate).toLocaleDateString(); // Formats into a readable date string
    const checkOutFormatted = new Date(checkOutDate).toLocaleDateString();

    // Calculate the length of stay at the top level
    // Calculate the length of stay
    const lengthOfStay = Math.ceil(
      (checkOut - checkIn) / (1000 * 60 * 60 * 24)
    );


    const handleBooking = async (roomId,price) => {
    
      const bookingData = {
        userId: userId,
        roomId: roomId,
        price: price,
        checkIn: checkInDate, // Format as YYYY-MM-DD
        checkOut: checkOutDate, // Format as YYYY-MM-DD
      };
      navigate("/home")

      try {
        // Send the POST request with the booking data
        console.log("roomId",roomId);
        const response = await axios.post(`http://localhost:8080/hotel/room/order?userId=${userId}&price=${price}&roomId=${roomId}&checkIn=${checkInDate}&checkOut=${checkOutDate}`);
        console.log('Booking successful:',response.data);
    
        navigate("/home")
      } catch (error) {
        console.error('Booking failed:', error);
        // Handle booking error (display error message, etc.)
      }
    };
      
        // try {
        //   // Make a booking request to the backend and await the response
        //   const response = await axios.post('http://localhost:8080/api/bookings', bookingData);
          
        //   // Navigate to booking confirmation page with state from successful response
        //   navigate('/hotel-confirm', { 
        //     state: {
        //       orderId: response.data.data.order_id,
        //       userId: userId,
        //       hotelId: hotelId,
        //       roomId: roomId,
        //       checkInDate: checkInDate,
        //       checkOutDate: checkOutDate,
        //       lengthOfStay: lengthOfStay,
        //       price: roomToBook.price,
        //       roomType: getRoomTypeName(roomToBook.room_type), // Assuming you have this function
        //       totalPrice: totalPrice,
        //     }
        //   });
        // } catch (error) {
        //   console.error('Booking failed', error);
        //   // Handle the error accordingly, maybe show an alert or message to the user
        // }
      // };

    return (
      <div className="hotel-detail-container">
        <div className="hotel-detail-header">
          <h1 className="hotel-name">{bookingData.hotelname}</h1>
          <p className="hotel-rating">{bookingData.rating}</p>
        </div>
        <div className="hotel-info">
          <p className="hotel-address">Address: {bookingData.address}</p>
          <p className="hotel-description">{bookingData.description}</p>
          <p className="hotel-phone">Phone: {bookingData.phone}</p>
        </div>
        <div className="room-item">
        <h2>Room Information</h2>
        <p>Room ID: {bookingData.roomNumber}</p>
        <p>Room Type: {bookingData.roomType}</p>
        <p>Room Price: €{bookingData.price}</p>
        <p>Check-In Date: {checkInDate}</p>
        <p>Check-Out Date: {checkOutDate}</p>
        <p>Length of Stay: {lengthOfStay} days</p>
        <button onClick={() => handleBooking(bookingData.roomId, bookingData.price)}>
          Book This Room
        </button>
        </div>
        
      </div>
    );
}

export default HotelDetail