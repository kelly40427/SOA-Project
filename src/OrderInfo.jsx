import React from 'react'
import './Home.css'
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

export function OrderInfo() {
  //获取登录页面传来的userId
  const location = useLocation();
  const userId = location.state.userId;
  console.log("User ID",userId);
  const navigate = useNavigate();
  const handleClickButton = (path) => {
    navigate(path, { state: { userId } });
};
  return (
    <div className='div-container'>
      <h2>My Order</h2>
      <button onClick={() => handleClickButton("/hotel-order")}>Hotel Order</button>
      <button onClick={() => handleClickButton("/attraction-order")}>Attraction Order</button>
    </div>
  )
}

export default OrderInfo