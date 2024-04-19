import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HotelDetail.css';

export function HotelDetail() {
    const location = useLocation();
    const userId = location.state.userId;
    const hotelId = location.state.hotelId;
    const roomId = location.state.roomId;
    const checkInDate = location.state.checkInDate;
    const checkOutDate = location.state.checkOutDate;
    console.log("User ID",userId,"Hotel ID",hotelId, "roomIID", roomId,checkInDate,checkOutDate);

    const [hotelname, setHotelName]=React.useState('');
    const [address, setAddress]=React.useState('');
    const [phonenumber, setPhoneNumber]=React.useState('');
    const [roomtype, setRoomType]=React.useState('');
    const [price, setPrice]=React.useState('');
    const [rating, setRating]=React.useState('');
    const [hoteldescription, setHotelDescription]=React.useState('');
    const [roomdescription, setRoomDescription]=React.useState('');

    const navigate = useNavigate(); 

    // Replace this useEffect with mock data for development purposes
    React.useEffect(() => {
        // Mock data simulating a successful response from your backend
        const mockHotelData = {
        name: 'Grandiose Hotel',
        address: '123 Paradise Road, Luxuryville',
        description: 'A luxurious stay awaits you at Grandiose Hotel, where every guest is treated like royalty.',
        phoneNumber: '1-800-LUX-STAY',
        rating: 5,
        };

        const mockRoomData = {
        roomType: 'Deluxe Suite',
        price: 350,
        description: 'A spacious suite with stunning views and all the modern amenities for a comfortable and opulent stay.',
        };

        // Simulate setting state from the mock data
        setHotelName(mockHotelData.name);
        setAddress(mockHotelData.address);
        setHotelDescription(mockHotelData.description);
        setPhoneNumber(mockHotelData.phoneNumber);
        setRating(mockHotelData.rating);
        setRoomType(mockRoomData.roomType);
        setPrice(mockRoomData.price);
        setRoomDescription(mockRoomData.description);
    }, []);



    // React.useEffect(()=>{
    //     axios.get(`http://localhost:8080/hotel/info?hotelId=${hotelId}`).
    //     then((response) => {
    //     console.log(response.data);
    //     if (response.data.code==0){
    //         setHotelName(response.data.data.name)
    //         setAddress(response.data.data.address)
    //         setHotelDescription(response.data.data.description)
    //         setPhoneNumber(response.data.data.phoneNumber)   
    //         setRating(response.data.data.rating)
    //     }
    //     else{
    //       //code为-1
    //       console.log("No information found")
    //     }})
    //     .catch(error => {
    //         console.log(error);
    //     });

    //     axios.get(`http://localhost:8080/hotel/info?roomId=${roomId}`).
    //     then((response) => {
    //     console.log(response.data);
    //     if (response.data.code==0){
    //         setRoomType(response.data.data.roomType)
    //         setPrice(response.data.data.price)
    //         setRoomDescription(response.data.data.description)
    //     }
    //     else{
    //       //code为-1
    //       console.log("No information found")
    //     }})
    //     .catch(error => {
    //         console.log(error);
    //     });
    // },[roomId]);

    const handleBooking = async () => {
            // Convert back to Date objects to calculate the difference in days
        const date1 = new Date(checkInDate);
        const date2 = new Date(checkOutDate);
        const lengthOfStay = Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
        const totalPrice = price * lengthOfStay;

        const bookingData = {
          orderId: null,
          userId: userId,
          hotelId: hotelId,
          roomId: roomId, // This should be specific to the room being booked
          orderStatus: 0,
          checkInDate: checkInDate,// Format the date as YYYY-MM-DD
          checkOutDate: checkOutDate, // Format the date as YYYY-MM-DD
          lengthOfStay: lengthOfStay,
          price: totalPrice,
        };
        navigate('/hotel-confirm', { state: {
            orderId:'100',
            userId:userId,
            hotelId: hotelId,
            roomId: roomId,
            checkInDate: checkInDate,// Format the date as YYYY-MM-DD
            checkOutDate: checkOutDate, // Format the date as YYYY-MM-DD
            lengthOfStay: lengthOfStay,
            price: price,
            roomtype: roomtype,
            totalPrice: totalPrice,
           } });
        // try {
        //   const response = await axios.post('http://localhost:8080/api/bookings', bookingData);
        //   // Assuming the backend responds with the booking ID and potentially other relevant data
        //   navigate('/hotel-confirm', { state: {
        //      orderId:response.data.data.id,
        //      userId:userId,
        //      hotelId: hotelId,
        //      roomId: roomId,
        //      checkInDate: checkInDate,// Format the date as YYYY-MM-DD
        //      checkOutDate: checkOutDate, // Format the date as YYYY-MM-DD
        //      lengthOfStay: lengthOfStay,
        //      price: price,
        //      roomtype: roomtype,
        //      totalPrice: totalPrice,
        //     } });
        // } catch (error) {
        //   console.error('Booking failed', error);
        // }
      };

  return (
    <div className="hotel-detail-container">
        <div className="hotel-detail-header">
            <h1 className="hotel-name">{hotelname}</h1>
            <p className="hotel-rating">{rating}</p>
        </div>
        <div className="hotel-info">
            <p className="hotel-address">Address: {address}</p>
            <p className="hotel-description">Hotel Description: {hoteldescription}</p>
            <p className="hotel-phone">Phone: {phonenumber}</p>
            <p className="hotel-room-type">Room Type: {roomtype}</p>
            <p className="hotel-room-description">Room Description: {roomdescription}</p>
            <p className="hotel-check-in-out">Check-In Date: {checkInDate} - Check-Out Date: {checkOutDate}</p>
            <p className="hotel-price">Price: €{price} one night</p>
        </div>
        <div className="hotel-book-button-container">
            <button className="book-button" onClick={handleBooking}>Book</button>
        </div>
    </div>
  )
}

export default HotelDetail