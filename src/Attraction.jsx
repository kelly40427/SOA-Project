import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for date picker
import axios from 'axios';
import './Attraction.css';

export function Attraction() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const userId = location.state.userId;
  console.log("User ID",userId);

  const [searchKeyword, setSearchKeyword] = React.useState('');
  const [attractions, setAttractions] = React.useState([]);
  const [filteredAttractions, setFilteredAttractions] = React.useState([]);
  const [choosedDate, setChoosedDate] = React.useState(new Date());
  const [selectedPriceRange, setSelectedPriceRange] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [attractionId, setAttractionId]=React.useState('');
  const [ticketsAvailable, setTicketsAvailable] =React.useState('');
  const CityOptions = ['Hengelo', 'Enschede', 'Amsterdam', 'Den Haag'];
  const priceRangeOptions = ['0-10', '10-20', '20-30','40-50', '50+'];
  console.log('All attractions:', filteredAttractions);
    // Mock data for attractions
    const attractionsData = [
      { attraction_id: 1,tickets_available: 990, name: 'Central Park',city:'Hengelo', description: 'A large public park in New York City.', price: 10, rating: 5 },
      { attraction_id: 2,tickets_available: 35, name: 'Eiffel Tower',city:'Enschede',description: 'An iconic iron tower in Paris.', price: 15, rating: 5 },
      { attraction_id: 3,tickets_available: 10,name: 'Colosseum',city:'Hengelo',description: 'A historical amphitheater in Rome.', price: 20, rating: 4 },
      { attraction_id: 4,tickets_available: 37, name: 'Taj Mahal',city:'Enschede', description: 'A historic white marble mausoleum in Agra.', price: 35, rating: 5 },
      { attraction_id: 5,tickets_available: 220,name: 'London Eye',city:'Enschede', description: 'A giant Ferris wheel on the South Bank of the River Thames in London.', price: 50, rating: 4 }
  ];
  React.useEffect(() => {
    setAttractions(attractionsData);
    setFilteredAttractions(attractionsData);
    setAttractionId(attractionsData.id);
}, []);

  // React.useEffect(()=>{
  //   axios.get(`http://localhost:8080/user/attraction`).
  //   then((response)=> {
  //     console.log(response.data);
  //     if(response.data.code==0){
  //       setAttractions(response.data.data);
  //       setFilteredAttractions(response.data.data);
  //       setAttractionId(response.data.data.attraction_id);
  //     }
  //     else{
  //       console.log('No information found')
  //     }
  //   })
  // }, []);
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
  const filtered = attractions.filter(attraction => {
    const matchesKeyword = !searchKeyword || attraction.name.toLowerCase().includes(searchKeyword.toLowerCase());
    const withinPriceRange = (minPrice === null || attraction .price >= minPrice) && 
                            (maxPrice === null || attraction .price <= maxPrice);
    const matchesCity = !selectedCity || attraction.city.toLowerCase() === selectedCity.toLowerCase();

    return matchesKeyword && withinPriceRange && matchesCity;
  });
  setFilteredAttractions(filtered);
};

const handleViewAttraction = (attraction) => {
  const visitDate = choosedDate.toISOString().split('T')[0];
  console.log("Original Chosen Date:", choosedDate); // 输出原始日期
  console.log("Visit Date after conversion:", visitDate); // 输出转换后的日期

    // Log the data you're sending
    const stateToSend ={
      userId: userId,
      attractionId: attraction.attraction_id,
      attractionName: attraction.name,
      visitDate: visitDate,
      price: attraction.price,
      description: attraction.description,
      ticketsAvailable: attraction.tickets_available, // Make sure this attribute exists
    };
    console.log("Navigating with state:", stateToSend)
    navigate(`/attraction-detail`, { state: stateToSend });
    
  // Prepare data to send or use in navigation
  // const dataToSend = {
  //     userId: userId,
  //     attractionId: attraction.attraction_id,
  //     attractionName: attraction.name,
  //     city: attraction.selectCity,
  //     visitDate: choosedDate.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
  //     price: attraction.price,
  //     ticketsAvailable: attraction.tickets_available,
  // };
  // console.log(attraction.id);

  // You could use axios to post data if required, e.g., booking a visit
  // axios.post('http://your-backend-url/api/attraction-visits', dataToSend)
  // .then((response) => {
  //     console.log(response.data);
  // })
  // .catch((error) => {
  //     console.log('Error sending data to the backend:', error);
  // });

};
  return (
    <div className="attraction-page-container">
    <div className="search-and-filters">
        <DatePicker
            selected={choosedDate}
            onChange={(date) => {
              console.log("Chosen Date:", date);
              setChoosedDate(date)
            }}
            dateFormat="yyyy/MM/dd"
        />
        <input
            type="text"
            placeholder="Search for attractions"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        
        <label>
            City: <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="">Select City</option>
                {CityOptions.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>
        </label>

        <label>
            Price Range: <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
                <option value="">Select Price Range</option>
                {priceRangeOptions.map(range => (
                    <option key={range} value={range}>{range}</option>
                ))}
            </select>
        </label>
    </div>

    <div className="attraction-list">
        {filteredAttractions.map(attraction => (
            <div className="attraction-item" key={attraction.attraction_id}>
                <h3 className='attraction-name'>{attraction.name}</h3>
                <p className='attraction-rating'>{attraction.rating}</p>
                <p className='attraction-price'>Price: €{attraction.price}</p>
                <p className='attraction-tickets'>Tickets Available: {attraction.tickets_available}</p>
                <button onClick={() => handleViewAttraction(attraction)}>
                    View Details
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

export default Attraction