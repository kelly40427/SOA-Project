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
  const [hotels, setHotels] = React.useState([]);
  const [filteredHotels, setFilteredHotels] = React.useState([]);
  const [checkInDate, setCheckInDate] = React.useState(new Date());
  const [checkOutDate, setCheckOutDate] = React.useState(new Date());
  const [selectedPriceRange, setSelectedPriceRange] = React.useState('');
  const [selectedRoomType, setSelectedRoomType] = React.useState('');
  const [hotelId, sethotelId]=React.useState('');
  const navigate = useNavigate(); 

  const roomTypeOptions = ['Single', 'Double', 'Suite', 'Deluxe'];
  const priceRangeOptions = ['0-100', '100-200', '200-300', '300+'];
  const hotelsData = [
    {
      id: 1,
      roomId: 120,
      name: 'Hotel A',
      description: 'Description of Hotel A',
      price: 150,
      rating:3,
      roomType: 'Single'
    },
    {
      id: 2,
      roomId: 121,
      name: 'Hotel B',
      description: 'Description of Hotel B',
      price: 220,
      rating:4,
      roomType: 'Double'
    },
    {
      id: 3,
      roomId: 122,
      name: 'Hotel C',
      description: 'Description of Hotel C',
      price: 300,
      rating: 5,
      roomType: 'Suite'
    },
    {
      id: 4,
      roomId: 123,
      name: 'Hotel D',
      description: 'Description of Hotel D',
      price: 270,
      rating: 5,
      roomType: 'Suite'
    },
    {
      id: 5,
      roomId: 124,
      name: 'Hotel E',
      description: 'Description of Hotel E',
      price: 170,
      rating: 3,
      roomType: 'Double'
    },
    // 添加更多酒店數據...
  ];

  // React.useEffect(()=>{
  //   axios.get(`http://localhost:8080/user/hotel?`).
  //   then((response)=> {
  //     console.log(response.data);
  //     if(response.data.code==0){
  //       setHotels(response.data);
  //       setFilteredHotels(response.data);
  //       sethotelId(response.data.data.hotelId);
  //     }
  //     else{
  //       console.log('No information found')
  //     }
  //   })
  // }, []);

  React.useEffect(()=>{
    setHotels(hotelsData);
    setFilteredHotels(hotelsData);
    sethotelId(hotelsData.id);
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    // Initialize minPrice and maxPrice with null to indicate they are not set
    let minPrice = null;
    let maxPrice = null;

    // Determine minPrice and maxPrice based on selectedPriceRange
    if (selectedPriceRange.includes('+')) {
      [minPrice] = selectedPriceRange.split('+').map(Number);
      maxPrice = Number.MAX_SAFE_INTEGER;
    } else if (selectedPriceRange) {
      [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
    }
    // Now filter the hotels based on the searchKeyword, room type, and price range if they are set
    const filtered = hotels.filter(hotel => {
      const matchesKeyword = !searchKeyword || hotel.name.toLowerCase().includes(searchKeyword.toLowerCase());
      const withinPriceRange = (minPrice === null || hotel.price >= minPrice) && 
                              (maxPrice === null || hotel.price <= maxPrice);
      const matchesRoomType = !selectedRoomType || hotel.roomType === selectedRoomType;

      return matchesKeyword && withinPriceRange && matchesRoomType;
    });
    setFilteredHotels(filtered);
  };

  const handleViewRooms = (hotel) =>{
    const lengthOfStay = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const dataToSend = {
      userId: userId,
      hotelId: hotel.id,
      roomId: hotel.roomId,
      hotelName: hotel.name,
      roomType: hotel.roomType,
      checkInDate: checkInDate.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
      checkOutDate: checkOutDate.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
      lengthOfStay: lengthOfStay,
    };
    console.log(hotel.id);

    // axios.post('http://your-backend-url/api/bookings', dataToSend).
    // then((response) =>{
    //   console.log(response.data);
    // })
    // .catch((error)=>{
    //   console.log('Error sending data to the backend:',error);
    // });

    navigate(`/hoteldetail`, { 
      state: {
        userId: userId, // Ensure this is the correct user ID to pass along
        hotelId: hotel.id, // The ID of the hotel for the booking
        roomId: hotel.roomId,
        hotelName: hotel.name, // Name of the hotel for confirmation display
        roomType: hotel.roomType, // Room type for the booking
        checkInDate: checkInDate.toISOString().split('T')[0], // Check-in date
        checkOutDate: checkOutDate.toISOString().split('T')[0], // Check-out date
        lengthOfStay: lengthOfStay, // Calculated length of stay
      }
    });
  }
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
        RoomType: <select value={selectedRoomType} onChange={(e) => setSelectedRoomType(e.target.value)}>
            <option value="">Select Room Type</option>
            {roomTypeOptions.map((type) => (
              <option key={type} value={type}>{type}</option>
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

      <div className="hotel-list">
        {filteredHotels.map((hotel) => (
          <div className="hotel-item" key={hotel.id}>
            <h3 className='hotel-name'>{hotel.name}</h3>
            <p className='roomtype'>{hotel.roomType}</p>
            <p className='hotel-rating'>{hotel.rating}</p>
            <p className='room-price'>Price: €{hotel.price}</p>
            <button onClick={() => handleViewRooms(hotel)}>
              View Rooms
            </button>
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