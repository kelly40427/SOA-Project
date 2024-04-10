import React from 'react';
import './index.css'; // 導入 CSS
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Order from "./Order";
import { useLocation } from 'react-router-dom';


export function Home() {

      //获取登录页面传来的userId
      const location = useLocation();
      const userId = location.state.userId;
      console.log("登录用户ID",userId);
      
    const navigate = useNavigate();

    const handleClickButton=(event,id)=>{
        navigate("/order")
      }

  return (
    <div>
    <button onClick={e => handleClickButton(e,1)}>Home</button>
    <h2>Home Page</h2>
      <p>Welcome, your user ID is: {userId}</p>
  </div>
  )
}

export default Home;

// function Main() {
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     // 假设 '/api/user/info' 是后端提供的获取当前用户信息的接口
//     // 注意：根据您的实际情况调整 API 路径和认证方式
//     fetch('/api/user/info', {
//       credentials: 'include', // 如果使用 cookies 进行会话管理
//     })
//     .then(response => response.json())
//     .then(data => {
//       // 假设后端返回的数据中包含 userId 字段
//       setUserId(data.userId);
//     })
//     .catch(error => console.error('Error fetching user info:', error));
//   }, []);

//   return (
//     <Router>
//       <div className="App">
//         <h1>My Travel</h1>
//         <nav>
//           <ul>
//             <li><Link to="/hotel-search">Hotel</Link></li>
//             <li><Link to="/attraction">Attraction</Link></li>
//             {/* 使用获取到的 userId 更新链接 */}
//             <li><Link to={`/order-detail?userid=${userId}`}>Order Information</Link></li>
//             <li><Link to={`/profile?userid=${userId}`}>Profile Information</Link></li>
//           </ul>
//         </nav>

//         <Routes>
//           <Route path="/hotel-search" element={<HotelSearch />} />
//           <Route path="/attraction" element={<Attraction />} />
//           {/* 在这里添加更多路由 */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// function HotelSearch() {
//   return <h2>Hotel Search Page</h2>;
// }

// function Attraction() {
//   return <h2>Attraction Page</h2>;
// }

// export default Main;