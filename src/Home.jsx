import * as React from 'react';
import './Home.css'; // 導入 CSS
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export function Home() {

    //获取登录页面传来的userId
    const location = useLocation();
    // const userId = location.state.userId;
    const userId = '1';
    const navigate = useNavigate();

    const handleClickButton = (path) => {
        navigate(path, { state: { userId } });
    };

  return (
    <div className='div-container'>
      <h2>My Travel</h2>
      <button onClick={() => handleClickButton("/hotel")}>Hotel</button>
      <button onClick={() => handleClickButton("/attraction")}>Attraction</button>
      <button onClick={() => handleClickButton("/profile-info")}>Profile Information</button>
      <button onClick={() => handleClickButton("/order-info")}>Order Information</button>
    </div>
  );
}

export default Home;
