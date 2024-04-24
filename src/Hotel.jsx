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
  const [roomTypes, setRoomTypes] = React.useState([]);
  const [hotelRooms, setHotelRooms] = React.useState({}); 

  //const roomTypeOptions = ['single room', 'double room', 'twin room', 'family room','business room','deluxe room'];
  const priceRangeOptions = ['0-100', '100-200', '200-300', '300+'];
// 模拟酒店数据
const mockHotels = [
  {
    hotel_id: 1,
    name: 'Hengelo Tomas Tree Star Hotel',
    address: 'Sport 123, Hengelo',
    phone_number: '1222223459',
    email: 'A@gmail.com',
    rating: 9.5
  },
  {
    hotel_id: 2,
    name: 'Hengelo Sousa Hotel',
    address: 'Sport 145, Hengelo',
    phone_number: '14432763801',
    email: 'B@gmail.com',
    rating: 0 // 假设这是未评级的酒店
  },
  // 更多酒店...
];

// 模拟房型数据
const mockRoomTypes = [
  { room_type_id: 1, room_type_name: 'single room' },
  { room_type_id: 2, room_type_name: 'double room' },
  { room_type_id: 3, room_type_name: 'twin room' },
  { room_type_id: 4, room_type_name: 'family room' },
  { room_type_id: 5, room_type_name: 'business room' },
  { room_type_id: 6, room_type_name: 'deluxe room' },
];

// 模拟房间数据，假设这是从后端获取的酒店房间列表
const mockHotelRooms = {
  1: [ // Hotel with ID 1 的房间列表
    {
      room_id: 1,
      hotel_id: 1,
      room_type: 1, // 单人房
      price: 90,
      room_number: 'B304',
      description: 'This is a single room of Hotel A.',
      room_status: 1
    },
    {
      room_id: 2,
      hotel_id: 1,
      room_type: 4, // 家庭房
      price: 300,
      room_number: 'C102',
      description: 'This is a family room of Hotel A.',
      room_status: 1
    },
    // 更多房间...
  ],
  2: [ // Hotel with ID 2 的房间列表
    {
      room_id: 5,
      hotel_id: 2,
      room_type: 6, // 豪华房
      price: 600,
      room_number: 'D102',
      description: 'Deluxe Room!!!',
      room_status: 1
    },
    {
      room_id: 6,
      hotel_id: 2,
      room_type: 4, // 豪华房
      price: 600,
      room_number: 'D301',
      description: 'This is a family room of Hotel B.!!!',
      room_status: 1
    },
    // 更多房间...
  ],
  // 更多酒店的房间...
};

React.useEffect(() => {
  // ...其他初始化代码...

  const hotelsWithMinPrice = mockHotels.map(hotel => {
    const roomsOfHotel = mockHotelRooms[hotel.hotel_id];
    const minPrice = roomsOfHotel.length > 0 ? Math.min(...roomsOfHotel.map(room => room.price)) : 0;
    return {...hotel, minPrice};
  });

  setHotels(hotelsWithMinPrice);
  setFilteredHotels(hotelsWithMinPrice);
  setRoomTypes(mockRoomTypes);
}, []);

  // React.useEffect(()=>{
  //   axios.get(`http://localhost:8080/user/hotel?`).then((response) => {
  //     // 假设response.data.data是包含酒店信息的数组
  //     const hotelData = response.data.data;
  //     const hotelPricePromises = hotelData.map((hotel) =>
  //       axios.get(`http://localhost:8080/hotels/${hotel.hotel_id}/rooms`)
  //     );
      
  //     // 获取所有酒店的房间信息并计算最低房价
  //     Promise.all(hotelPricePromises).then((roomResponses) => {
  //       const hotelsWithMinPrice = hotelData.map((hotel, index) => {
  //         const rooms = roomResponses[index].data.data; // 假设这是房间数据
  //         const minPrice = Math.min(...rooms.map(room => room.price));
  //         return { ...hotel, minPrice }; // 为酒店对象添加最低价格属性
  //       });
        
  //       setHotels(hotelsWithMinPrice);
  //       setFilteredHotels(hotelsWithMinPrice);
  //     });
  //   }).catch((error) => {
  //     console.error('Error fetching hotels or rooms:', error);
  //   });

  //     // 假設這個API是用來獲取房型信息
  //   axios.get('http://localhost:8080/room-types')
  //   .then((response) => {
  //     setRoomTypes(response.data);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching room types:', error);
  //   });

  // }, []);

  // React.useEffect(() => {
  //   // 根据酒店列表获取每个酒店的房间信息
  //   hotels.forEach(hotel => {
  //     axios.get(`http://localhost:8080/hotels/${hotel.hotel_id}/rooms`)
  //       .then((response) => {
  //         setHotelRooms(prevRooms => ({
  //           ...prevRooms,
  //           [hotel.hotel_id]: response.data.data // 假设这是房间数据
  //         }));
  //       })
  //       .catch((error) => {
  //         console.error(`Error fetching rooms for hotel ${hotel.id}:`, error);
  //       });
  //   });
  // }, [hotels]);

  // React.useEffect(()=>{
  //   setHotels(hotelsData);
  //   setFilteredHotels(hotelsData);
  // }, []);

  const handleSearch = () => {
    let minPrice = null;
    let maxPrice = null;
  
    if (selectedPriceRange.includes('+')) {
      minPrice = Number(selectedPriceRange.split('+')[0]);
      maxPrice = Number.MAX_SAFE_INTEGER;
    } else if (selectedPriceRange) {
      [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
    }
  
    const selectedRoomTypeId = roomTypes.find(rt => rt.room_type_name === selectedRoomType)?.room_type_id;
  
    const filtered = hotels.filter(hotel => {
      const matchesKeyword = !searchKeyword || hotel.name.toLowerCase().includes(searchKeyword.toLowerCase());
      const matchesPriceRange = !selectedPriceRange || (hotel.minPrice >= minPrice && hotel.minPrice <= maxPrice);
      const hasRoomType = !selectedRoomType || mockHotelRooms[hotel.hotel_id]?.some(room => room.room_type === selectedRoomTypeId);
      
      return matchesKeyword && matchesPriceRange && hasRoomType;
    });
  
    setFilteredHotels(filtered);
  };


  const handleViewRooms = (hotelId) =>{
    console.log("Navigating to hotel detail with ID:", hotelId);
    const lengthOfStay = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    // const dataToSend = {
    //   user_id: userId,
    //   hotel_id: hotelId,
    //   check_in: checkInDate.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
    //   check_out: checkOutDate.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
    //   length_of_Stay: lengthOfStay,
    // };

    // axios.post('http://your-backend-url/api/bookings', dataToSend).
    // then((response) =>{
    //   console.log(response.data);
      
    // })
    // .catch((error)=>{
    //   console.log('Error sending data to the backend:',error);
    // });
    // const rooms = response.data.data;
    navigate(`/hoteldetail`, { 
      state: {
        userId: userId, // 确保传递正确的用户ID
        hotelId: hotelId, // 传递用户选择查看房间的酒店ID
        checkInDate: checkInDate.toISOString().split('T')[0],
        checkOutDate: checkOutDate.toISOString().split('T')[0],
        lengthOfStay: lengthOfStay,
      }
    });
    // axios.get(`http://localhost:8080/hotels/${hotelId}/rooms`)
    // .then((response) => {
    //   // 现在我们有了特定酒店的房间数据，可以将其用于导航或其他逻辑
    //   const rooms = response.data.data;
    //   navigate(`/hoteldetail`, { 
    //     state: {
    //       userId: userId, // 确保传递正确的用户ID
    //       hotelId: hotelId, // 传递用户选择查看房间的酒店ID
    //       rooms: rooms, // 传递获取到的房间数据
    //       checkInDate: checkInDate.toISOString().split('T')[0],
    //       checkOutDate: checkOutDate.toISOString().split('T')[0],
    //       lengthOfStay: lengthOfStay,
    //     }
    //   });
    // })
    // .catch((error) => {
    //   console.error(`Error fetching rooms for hotel ${hotelId}:`, error);
    // });

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
            {roomTypes.map((type) => (
              <option key={type.room_type_id} value={type.room_type_name}>{type.room_type_name}</option>
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
          <div className="hotel-item" key={hotel.hotel_id}>
            <h3 className='hotel-name'>{hotel.name}</h3>
            <p className='hotel-rating'>{hotel.rating}</p>
            <p className='hotel-min-price'>From: ${hotel.minPrice}</p>
            {/* 为每个酒店渲染房间列表 */}
            <button onClick={() => handleViewRooms(hotel.hotel_id)}>
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