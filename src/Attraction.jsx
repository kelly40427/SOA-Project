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
  const CityOptions = ['Hengelo', 'Enschede', 'Amsterdam', 'Den Haag'];
  const priceRangeOptions = ['0-100', '100-200', '200-300', '300+'];
    // Mock data for attractions
    const attractionsData = [
      { id: 1, city: 'New York', name: 'Central Park',city:'Hengelo',rating:5, description: 'A large public park in New York City.', price: 0, rating: 5 },
      { id: 2, city: 'Paris', name: 'Eiffel Tower',city:'enschede',rating:4.5, description: 'An iconic iron tower in Paris.', price: 125, rating: 5 },
      { id: 3, city: 'Rome', name: 'Colosseum',city:'Hengelo',rating:3.7, description: 'A historical amphitheater in Rome.', price: 220, rating: 4 },
      { id: 4, city: 'Agra', name: 'Taj Mahal',city:'enschede',rating:4.9, description: 'A historic white marble mausoleum in Agra.', price: 215, rating: 5 },
      { id: 5, city: 'London', name: 'London Eye',city:'enschede',rating:4.8, description: 'A giant Ferris wheel on the South Bank of the River Thames in London.', price: 530, rating: 4 }
  ];
  React.useEffect(() => {
    setAttractions(attractionsData);
    setFilteredAttractions(attractionsData);
    setAttractionId(attractionsData.id);
}, []);

  // React.useEffect(()=>{
  //   axios.get(`http://localhost:8080/user/attraction?`).
  //   then((response)=> {
  //     console.log(response.data);
  //     if(response.data.code==0){
  //       setAttractions(response.data.data.attractions);
  //       setFilteredAttractions(response.data.data.attractions);
  //       setAttractionId(response.data.data.id);
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
  // Prepare data to send or use in navigation
  const dataToSend = {
      userId: userId,
      attractionId: attraction.id,
      attractionName: attraction.name,
      city: attraction.selectCity,
      visitDate: choosedDate.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
      price: attraction.price,
  };
  console.log(attraction.id);

  // You could use axios to post data if required, e.g., booking a visit
  // axios.post('http://your-backend-url/api/attraction-visits', dataToSend)
  // .then((response) => {
  //     console.log(response.data);
  // })
  // .catch((error) => {
  //     console.log('Error sending data to the backend:', error);
  // });

  navigate(`/attraction-detail`, {
      state: {
          userId: userId,
          attractionId: attraction.id,
          attractionName: attraction.name,
          visitDate: choosedDate.toISOString().split('T')[0],
          price: attraction.price,
          description: attraction.description,
      }
  });
};
  return (
    <div className="attraction-page-container">
    <div className="search-and-filters">
        <DatePicker
            selected={choosedDate}
            onChange={(date) => setChoosedDate(date)}
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
            <div className="attraction-item" key={attraction.id}>
                <h3 className='attraction-name'>{attraction.name}</h3>
                <p className='attraction-rating'>{attraction.rating}</p>
                <p className='attraction-price'>Price: €{attraction.price}</p>
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