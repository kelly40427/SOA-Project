import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AttractionDetail.css';

export function AttractionDetail() {
    const location = useLocation();
    console.log(location.state);
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
    const [ticket_available, setTickectAvailable]=React.useState('');

    const navigate = useNavigate(); 

    const attractionsData = [
        { attraction_id: 1,tickets_available: 990,phone:'12321412412', name: 'Central Park',city:'Hengelo', description: 'A large public park in New York City.', price: 10, rating: 5 },
        { attraction_id: 2,tickets_available: 35,phone:'123werfead', name: 'Eiffel Tower',city:'Enschede',description: 'An iconic iron tower in Paris.', price: 15, rating: 5 },
        { attraction_id: 3,tickets_available: 10,phone:'sdfsfsda',name: 'Colosseum',city:'Hengelo',description: 'A historical amphitheater in Rome.', price: 20, rating: 4 },
        { attraction_id: 4,tickets_available: 37,phone:'fasf1231242', name: 'Taj Mahal',city:'Enschede', description: 'A historic white marble mausoleum in Agra.', price: 35, rating: 5 },
        { attraction_id: 5,tickets_available: 220,phone:'1533464645',name: 'London Eye',city:'Enschede', description: 'A giant Ferris wheel on the South Bank of the River Thames in London.', price: 50, rating: 4 }
    ];

    React.useEffect(() => {
        // Use the correct property name: 'attraction_id'
        const attraction = attractionsData.find(item => item.attraction_id === attractionId);
    
        if (attraction) {
            setAttractionName(attraction.name);
            setRating(attraction.rating);
            setAttractionDescription(attraction.description);
            setPrice(attraction.price);
            setCity(attraction.city);
            setAddress(attraction.address);
            setPhoneNumber(attraction.phone);
            setTickectAvailable(attraction.tickets_available);
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
    //         setPhoneNumber(response.data.data.phone_number)   
    //         setRating(response.data.data.rating)
    //         setPrice(response.data.data.price)
    //         setCity(response.data.data.city)
    //         setTickectAvailable(response.data.data.tickets_available)
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
            order_id: null,
            user_id: userId,
            price: price,
            order_status:1,
            attraction_id: attractionId,
            visit_date: visitDate, // The date the user plans to visit the attraction
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

        //Uncomment the following to implement booking logic using an API call
        // try {
        //     const response = await axios.post('http://your-backend-url/api/attraction-visits', bookingData);
        //     // Handle response data, possibly navigating to a confirmation page
        //     navigate('/attraction-confirm', { state: {
        //          orderId: response.data.data.order_id,
        //          userId: userId,
        //          attractionId: attractionId,
        //          attractionName: AttractionName,
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
        <p className="attraction-price">Ticket Available: {ticket_available}</p>
        <p className="attraction-price">Price: €{price}</p>
    </div>
    <div className="attraction-visit-button-container">
        <button className="visit-button" onClick={handleBooking}>Book Visit</button>
    </div>
</div>
  )
}

export default AttractionDetail