import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AttractionDetail.css';

export function AttractionDetail() {
    const location = useLocation();
    const userId = location.state.userId;
    const attractionId = location.state.attractionId;
    const visitDate = location.state.visitDate;
    console.log("User ID",userId,"Attraction ID",attractionId,visitDate);

    const [AttractionName, setAttractionName]=React.useState('');
    const [address, setAddress]=React.useState('');
    const [PhoneNumber, setPhoneNumber]=React.useState('');
    const [city, setCity]=React.useState('');
    const [price, setPrice]=React.useState('');
    const [rating, setRating]=React.useState('');
    const [AttractionDescription, setAttractionDescription]=React.useState('');

    const navigate = useNavigate(); 

    const attractionsData = [
        { id: 1, city: 'New York', name: 'Central Park',city:'Hengelo',rating:5,address:'123 street, Hengelo',phone:'031723903', description: 'A large public park in New York City.', price: 0, rating: 5 },
        { id: 2, city: 'Paris', name: 'Eiffel Tower',city:'enschede',rating:4.5,address:'109 street, Enschede',phone:'038476289', description: 'An iconic iron tower in Paris.', price: 125, rating: 5 },
        { id: 3, city: 'Rome', name: 'Colosseum',city:'Hengelo',rating:3.7,address:'447 street, Hengelo',phone:'568493099', description: 'A historical amphitheater in Rome.', price: 220, rating: 4 },
        { id: 4, city: 'Agra', name: 'Taj Mahal',city:'enschede',rating:4.9,address:'318 street, Enschede',phone:'049567888', description: 'A historic white marble mausoleum in Agra.', price: 215, rating: 5 },
        { id: 5, city: 'London', name: 'London Eye',city:'enschede',rating:4.8,address:'154 street, Enschede',phone:'014898789', description: 'A giant Ferris wheel on the South Bank of the River Thames in London.', price: 530, rating: 4 }
    ];

    React.useEffect(() => {
        // Assuming attractionsData is available within this component scope,
        // if not, it should be passed as a prop or fetched from an API
        const attraction = attractionsData.find(item => item.id === attractionId);

        if (attraction) {
            setAttractionName(attraction.name);
            setRating(attraction.rating);
            setAttractionDescription(attraction.description);
            setPrice(attraction.price);
            setCity(attraction.city);
            setAddress(attraction.address);
            setPhoneNumber(attraction.phone) 

        } else {
            console.log("No attraction found with the given ID");
        }

    }, [attractionId]);

    // React.useEffect(()=>{
    //     axios.get(`http://localhost:8080/hotel/info?hotelId=${attractionId}`).
    //     then((response) => {
    //     console.log(response.data);
    //     if (response.data.code==0){
    //         setAttractionName(response.data.data.name)
    //         setAddress(response.data.data.address)
    //         setAttractionDescription(response.data.data.description)
    //         setPhoneNumber(response.data.data.phone)   
    //         setRating(response.data.data.rating)
    //         setPrice(response.data.data.price)
    //         setCity(response.data.data.city)
    //     }
    //     else{
    //       //code为-1
    //       console.log("No information found")
    //     }})
    //     .catch(error => {
    //         console.log(error);
    //     });
    // },[attractionId]);

    
    const handleBooking = async () => {
        // Construct booking data for the attraction visit
        const bookingData = {
            orderId: null,
            userId: userId,
            attractionId: attractionId,
            visitDate: visitDate, // The date the user plans to visit the attraction
            price: price, // The price of the attraction visit
        };

        console.log('Booking data:', bookingData);

        // Simulate navigation to a confirmation page with the booking data
        navigate('/attraction-confirm', { state:{
            orderId: '101',
            userId: userId,
            attractionId: attractionId,
            attractionName: AttractionName,
            visitDate: visitDate, // The date the user plans to visit the attraction
            price: price,
        }
        });

        // //Uncomment the following to implement booking logic using an API call
        // try {
        //     const response = await axios.post('http://your-backend-url/api/attraction-visits', bookingData);
        //     // Handle response data, possibly navigating to a confirmation page
        //     navigate('/attraction-confirm', { state: {
        //          orderId: response.data.data.id,
        //          userId: userId,
        //          attractionId: attractionId,
        //          visitDate: visitDate, // The date the user plans to visit the attraction
        //          price: price, // The price of the attraction visit
        //         } });
        // } catch (error) {
        //     console.error('Booking failed', error);
        // }
    };

  return (
    <div className="attraction-detail-container">
    <div className="attraction-detail-header">
        <h1 className="attraction-name">{AttractionName}</h1>
        <p className="attraction-rating">{rating}</p>
    </div>
    <div className="attraction-info">
        <p className="attraction-address">Address: {address}</p>
        <p className="attraction-description">Description: {AttractionDescription}</p>
        <p className="attraction-phone">Phone: {PhoneNumber}</p>
        <p className="attraction-city">City: {city}</p>
        <p className="attraction-visit-date">Visit Date: {visitDate}</p>
        <p className="attraction-price">Price: €{price}</p>
    </div>
    <div className="attraction-visit-button-container">
        <button className="visit-button" onClick={handleBooking}>Book Visit</button>
    </div>
</div>
  )
}

export default AttractionDetail