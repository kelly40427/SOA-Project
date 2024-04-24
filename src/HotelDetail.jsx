import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HotelDetail.css';

export function HotelDetail() {
    const location = useLocation();
    const { userId, hotelId, checkInDate, checkOutDate } = location.state;
    console.log("User ID", userId, "Hotel ID", hotelId, "Check-in Date", checkInDate, "Check-out Date", checkOutDate);

    const [hotelDetails, setHotelDetails] = React.useState({});
    const [rooms, setRooms] = React.useState([]);
    const [roomTypes, setRoomTypes] = React.useState([]);

    const navigate = useNavigate(); 
    const mockHotels = [
        {
          hotel_id: 1,
          name: 'Hengelo Tomas Tree Star Hotel',
          address: 'Sport 123, Hengelo',
          description: 'This is a hotel located in Hengelo',
          phone_number: '1222223459',
          email: 'A@gmail.com',
          rating: 9.5
        },
        {
          hotel_id: 2,
          name: 'Hengelo Sousa Hotel',
          address: 'Sport 145, Hengelo',
          description: 'This is a hotel located in Hengelo',
          phone_number: '14432763801',
          email: 'B@gmail.com',
          rating: 0
        },
        // Add more hotels if necessary
      ];
      
      const mockRoomTypes = [
        { room_type_id: 1, room_type_name: 'single room' },
        { room_type_id: 2, room_type_name: 'double room' },
        { room_type_id: 3, room_type_name: 'twin room' },
        { room_type_id: 4, room_type_name: 'family room' },
        { room_type_id: 5, room_type_name: 'business room' },
        { room_type_id: 6, room_type_name: 'deluxe room' },
      ];
      
      const mockHotelRooms = {
        1: [ // Rooms for Hotel ID 1
          {
            room_id: 1,
            hotel_id: 1,
            room_type: 1, // Single room
            price: 90,
            room_number: 'B304',
            description: 'This is a single room in Hengelo Tomas Tree Star Hotel.',
            room_status: 1 // Indicates if the room is available or booked
          },
          {
            room_id: 2,
            hotel_id: 1,
            room_type: 4, // Family room
            price: 300,
            room_number: 'C102',
            description: 'This is a family room in Hengelo Tomas Tree Star Hotel.',
            room_status: 1
          },
        ],
        2: [ // Rooms for Hotel ID 2
          {
            room_id: 5,
            hotel_id: 2,
            room_type: 6, // Deluxe room
            price: 600,
            room_number: 'D102',
            description: 'Deluxe Room in Hengelo Sousa Hotel.',
            room_status: 1
          },
          {
            room_id: 6,
            hotel_id: 2,
            room_type: 4, // Family room
            price: 600,
            room_number: 'D301',
            description: 'This is a family room in Hengelo Sousa Hotel.',
            room_status: 1
          },
        ],
        // Additional hotel rooms can be added here
      };

      // Inside your React component's useEffect hook:
    React.useEffect(() => {
        // Here you should replace the mock data with the actual API calls
        // For now, we will use the mock data directly

    
        // Set the state for room types
        setRoomTypes(mockRoomTypes);
    
        // Ensure the correct hotel ID is used to get the room data
        const hotelRooms = mockHotelRooms[hotelId] || []; // Default to an empty array if no rooms are found for the hotel
        setRooms(hotelRooms);

        // Find the selected hotel details
        const selectedHotelDetails = mockHotels.find(hotel => hotel.hotel_id === hotelId);
        setHotelDetails(selectedHotelDetails || {});
    
    }, [hotelId]);

    const getRoomWithMinPrice = (rooms) => {
      if (!rooms || rooms.length === 0) return null;
      return rooms.reduce((minRoom, currentRoom) => (currentRoom.price < minRoom.price ? currentRoom : minRoom));
    };
  
    const roomWithMinPrice = getRoomWithMinPrice(rooms);
  
    // React.useEffect(()=>{
    //     axios.get(`http://localhost:8080/hotel/info?hotelId=${hotelId}`).
    //     then((response) => {
    //     console.log(response.data);
    //     if (response.data.code==0){
    //         setHotelDetails(response.data.data);
    //     }
    //     else{
    //       //code为-1
    //       console.log("No information found")
    //     }})
    //     .catch(error => {
    //         console.log(error);
    //     });

    //         // Fetch room types
    //     axios.get('http://localhost:8080/room-types').then(response => {
    //         if (response.data.code === 0) {
    //         setRoomTypes(response.data.data);
    //         } else {
    //         console.log("No room types information found");
    //         }
    //     }).catch(error => console.log(error));

    //     axios.get(`http://localhost:8080/hotels/${hotelId}/rooms`).
    //     then((response) => {
    //     console.log(response.data);
    //     if (response.data.code==0){
    //         setRooms(response.data.data);
    //     }
    //     else{
    //       //code为-1
    //       console.log("No information found")
    //     }})
    //     .catch(error => {
    //         console.log(error);
    //     });
    // },[hotelId]);

    const handleBooking = async (roomId) => {
        // Convert back to Date objects to calculate the difference in days
        const date1 = new Date(checkInDate);
        const date2 = new Date(checkOutDate);
        const lengthOfStay = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
        
        // Find the room details to get the price and type
        const roomToBook = rooms.find(room => room.room_id === roomId);
        
        // If the room is not found, throw an error or handle accordingly
        if (!roomToBook) {
          console.error('Room not found');
          return;
        }
        
        // Calculate the total price for the booking
        const totalPrice = roomToBook.price * lengthOfStay;
      
        // Prepare booking data for POST request
        const bookingData = {
          user_id: userId,
          hotel_id: hotelId,
          room_id: roomId,
          check_in: checkInDate, // Already in YYYY-MM-DD format
          check_out: checkOutDate, // Already in YYYY-MM-DD format
          length_of_stay: lengthOfStay,
          total_price: totalPrice,
        };
        navigate('/hotel-confirm', { 
            state: {
              orderId: 101,
              userId: userId,
              hotelId: hotelId,
              roomId: roomId,
              checkInDate: checkInDate,
              checkOutDate: checkOutDate,
              lengthOfStay: lengthOfStay,
              price: roomToBook.price,
              roomType: getRoomTypeName(roomToBook.room_type), // Assuming you have this function
              totalPrice: totalPrice,
            }
          });
      
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
      };


    const getRoomTypeName = (roomTypeId) => {
      const roomType = roomTypes.find(type => type.room_type_id === roomTypeId);
      return roomType ? roomType.room_type_name : 'Unknown';
    };
    return (
      <div className="hotel-detail-container">
        <div className="hotel-detail-header">
          <h1 className="hotel-name">{hotelDetails.name}</h1>
          <p className="hotel-rating">{hotelDetails.rating}</p>
        </div>
        <div className="hotel-info">
          <p className="hotel-address">Address: {hotelDetails.address}</p>
          <p className="hotel-description">{hotelDetails.description}</p>
          <p className="hotel-phone">Phone: {hotelDetails.phone_number}</p>
        </div>
        <div className="room-item">
          {roomWithMinPrice && (
            <>
              <p>Room Number: {roomWithMinPrice.room_number}</p>
              <p>Room Type: {getRoomTypeName(roomWithMinPrice.room_type)}</p>
              <p>Price: €{roomWithMinPrice.price}</p>
              <p>Description: {roomWithMinPrice.description}</p>
              <button onClick={() => handleBooking(roomWithMinPrice.room_id)}>Book This Room</button>
            </>
          )}
        </div>
      </div>
    );
}

export default HotelDetail