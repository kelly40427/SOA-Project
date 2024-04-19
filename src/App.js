import './App.css';
import { Navigate, Route, Routes, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Hotel from './Hotel';
import Attraction from './Attraction';
import OrderInfo from './OrderInfo';
import ProfileInfo from './ProfileInfo';
import HotelOrder from './HotelOrder';
import AttractionOrder from './AttractionOrder';
import HotelDetail from './HotelDetail';
import HotelConfirmation from './HotelConfirmation';
import OrderConfirmation from './OrderConfirmation';
import AttractionDetail from './AttractionDetail';
import AttractionConfirmation from './AttractionConfirmation';
import AdminDashboard from './AdminDashboard';
import AdminUser from './AdminUser';
import AdminAttractionOrder from './AdminAttractionOrder';
import AdminHotelOrder from './AdminHotelOrder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path ='/home' element={<Home />}/>
        <Route path ='/hotel' element={<Hotel />}/>
        <Route path = '/attraction' element={<Attraction />}/>
        <Route path = '/order-info' element={<OrderInfo/>}/>
        <Route path = '/profile-info' element={<ProfileInfo/>}/>
        <Route path = '/hotel-order' element={<HotelOrder/>}/>
        <Route path = '/attraction-order' element={<AttractionOrder/>}/>
        <Route path = '/hoteldetail' element={<HotelDetail/>}/>
        <Route path = '/hotel-confirm' element={<HotelConfirmation/>}/>
        <Route path = '/order-confirmation' element={<OrderConfirmation/>}/>
        <Route path = '/attraction-detail' element={<AttractionDetail/>}/>
        <Route path = '/attraction-confirm' element={<AttractionConfirmation/>}/>
        <Route path = '/admin' element={<AdminDashboard/>}>
          {/* Nested routes for admin */}
          <Route path='user' element={<AdminUser/>}/>
          <Route path='attraction-order' element={<AdminAttractionOrder/>}/>
          <Route path ='hotel-order' element={<AdminHotelOrder/>}/>
          {/* ... other admin pages ... */}
        </Route>
        <Route path = '/admin' element={<AdminDashboard/>}/>
        <Route path = '/admin/user' element={<AdminUser/>}/>
        <Route path = '/admin/attraction-order' element={<AdminAttractionOrder/>}/>
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
 
  );
}

export default App;
