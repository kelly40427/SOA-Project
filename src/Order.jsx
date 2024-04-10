import React from 'react';
import './Order.css'; // 導入 CSS
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

export function Order() {
  const navigate = useNavigate();
  const userId = 'your-user-id'; // 这里模拟获取用户 ID，实际应用中可能需要从后端或状态管理库中获取

  const goToOrderDetail = (path) => {
    navigate(`/${path}?userid=${userId}`);
  };

  return (
    <div className="App">
      <h1>My Order</h1>
      <nav>
        <ul>
          <li><a href="#" onClick={() => goToOrderDetail('order-hotel')}>Hotel Order</a></li>
          <li><a href="#" onClick={() => goToOrderDetail('order-attraction')}>Attraction Order</a></li>
        </ul>
      </nav>

    </div>
  );
}

export default Order;