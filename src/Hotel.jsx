import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for date picker
import axios from 'axios';
import './Hotel.css';

export function Hotel() {
  //获取登录页面传来的userId
  const location = useLocation();
  const userId = location.state.userId;
  console.log("User ID",userId);

  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [rooms, setRooms] = React.useState([]);
  const [filteredHotels, setFilteredHotels] = React.useState([]);
  const [checkInDate, setCheckInDate] = React.useState(new Date());
  const [checkOutDate, setCheckOutDate] = React.useState(new Date());
  const [selectedPriceRange, setSelectedPriceRange] = React.useState('');
  const [selectedRoomType, setSelectedRoomType] = React.useState('');
  const [hotelId, sethotelId]=React.useState('');
  const navigate = useNavigate(); 
  const [roomTypes, setRoomTypes] = React.useState([]);
  const [hotelRooms, setHotelRooms] = React.useState({}); 
  const [minPrice, setMinPrice] = React.useState(null); // Declare and initialize
  const [maxPrice, setMaxPrice] = React.useState(null); // Declare and initialize

  const roomTypeOptions = [
    { roomTypeId: 1, room_type_name: 'single room' },
    { roomTypeId: 2, room_type_name: 'double room' },
    { roomTypeId: 3, room_type_name: 'twin room' },
    { roomTypeId: 4, room_type_name: 'family room' },
    { roomTypeId: 5, room_type_name: 'business room' },
    { roomTypeId: 6, room_type_name: 'deluxe room' },
  ];

  const priceRangeOptions = ['0-100', '100-200', '200-300', '300+'];
  const mockRoomData = [
    {
      hotelId: 1,
      name: 'Hengelo Tomas Tree Star Hotel ',
      address: 'Sport 123, Hengelo',
      description: 'This is a hotel located in Hengelo',
      phoneNumber: '12222233459',
      email: 'A@gmail.com',
      rating: 9.5,
      roomId: 1,
      roomTypeId: 2,
      roomTypeName: 'single room',
      price: 90,
      roomNumber: 'B304',
    },
    {
      hotelId: 2,
      name: 'Hengelo Sousa Hotel ',
      address: 'Sport 145, Hengelo',
      description: 'This is a hotel located in Hengelo',
      phoneNumber: '14432763801',
      email: 'B@gmail.com',
      rating: 0,
      roomId: 4,
      roomTypeId: 1,
      roomTypeName: 'single room',
      price: 95,
      roomNumber: 'A101',
    },
    {
      hotelId: 1,
      name: 'Hengelo Tomas Tree Star Hotel ',
      address: 'Sport 123, Hengelo',
      description: 'This is a hotel located in Hengelo',
      phoneNumber: '12222233459',
      email: 'A@gmail.com',
      rating: 9.5,
      roomId: 6,
      roomTypeId: 1,
      roomTypeName: 'single room',
      price: 79,
      roomNumber: 'B201',
    },
    {
      hotelId: 1,
      name: 'Hengelo Tomas Tree Star Hotel ',
      address: 'Sport 123, Hengelo',
      description: 'This is a hotel located in Hengelo',
      phoneNumber: '12222233459',
      email: 'A@gmail.com',
      rating: 9.5,
      roomId: 7,
      roomTypeId: 1,
      roomTypeName: 'single room',
      price: 60,
      roomNumber: 'E211',
    },
  ];

  React.useEffect(() => {
    setRooms(mockRoomData); // Use mock data as initial state
  }, []);

  // React.useEffect(()=>{
  //     // 假設這個API是用來獲取房型信息
  //   axios.get('http://localhost:8080/hotels')
  //   .then((response) => {
  //     setRooms(response.data.data);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching room types:', error);
  //   });

  // }, []);


  const getRoomTypeName = (roomTypeId) => {
    const roomType = roomTypeOptions.find(rt => rt.roomTypeId === roomTypeId);
    return roomType ? roomType.room_type_name : 'Unknown';
  };

  const handleSearch = () => {
    // Set min and max price ranges
    let minPrice = 0;
    let maxPrice = Number.MAX_SAFE_INTEGER;
    
    if (selectedPriceRange.includes('+')) {
      minPrice = Number(selectedPriceRange.split('+')[0]);
    } else if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      minPrice = min;
      maxPrice = max;
    }
    
    // Find the corresponding room type ID based on selected room type name
    const selectedRoomTypeId = roomTypeOptions.find(rt => rt.room_type_name === selectedRoomType)?.roomTypeId;
  
    const filteredRooms = rooms.filter(room => {
      const matchesKeyword = !searchKeyword || room.name.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchesRoomType = !selectedRoomTypeId || room.roomTypeId === selectedRoomTypeId;
      const matchesPriceRange = room.price >= minPrice && room.price <= maxPrice;
  
      return matchesKeyword && matchesRoomType && matchesPriceRange;
    });
  
    setRooms(filteredRooms);
  };

  const handleViewRooms = async (room, userId) => {
    const lengthOfStay = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    const dataToSend = {
      userId,
      hotelId: room.hotelId,
      checkInDate: checkInDate.toISOString().split('T')[0],
      checkOutDate: checkOutDate.toISOString().split('T')[0],
      lengthOfStay,
      minPrice,
      maxPrice,
    };

    try {
      await axios.post('/api/hotel/view', dataToSend);
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }

    navigate(`/hoteldetail`, {
      state: {
        userId: userId,
        address: room.address,
        hotelname:room.name,
        description: room.description,
        phone: room.phoneNumber,
        roomNumber: room.roomNumber,
        roomType: room.roomTypeName,
        price: room.price,
        rating: room.rating,
        checkInDate: checkInDate.toISOString().split('T')[0],
        checkOutDate:checkOutDate.toISOString().split('T')[0],
        roomId:room.roomId
      },
    });
  };

  return (
    <div className="hotel-page-container">
      <div className="search-and-filters">
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          dateFormat="yyyy/MM/dd"
        />
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          dateFormat="yyyy/MM/dd"
        />
        <input
          type="text"
          placeholder="Search for hotels"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        
        <label>
        RoomType:<select value={selectedRoomType} onChange={(e) => setSelectedRoomType(e.target.value)}>
          <option value="">Select Room Type</option>
          {roomTypeOptions.map((type) => (
            <option key={type.roomTypeId} value={type.room_type_name}>
              {type.room_type_name}
            </option>
          ))}
        </select>
        </label>

        <label>
          Price Range: <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
            <option value="">Select Price Range</option>
            {priceRangeOptions.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="room-list">
        {rooms.map(room => (
          <div key={room.roomId} className="room-item">
            <h3>{room.name}</h3>
            <p>Room Number: {room.roomNumber}</p>
            <p>Room Type: {getRoomTypeName(room.roomTypeId)}</p>
            <p>Price: ${room.price}</p>
            <p>Description: {room.description}</p>
            <button onClick={() => handleViewRooms(room, userId)}>Book Room</button>
          </div>
        ))}
      </div>

      <div className="button-container">
      <button className="home-button" onClick={() => navigate("/home")}>Home</button>
      </div>
    </div>
  )
}

export default Hotel