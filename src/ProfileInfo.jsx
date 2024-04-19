import * as React from 'react';
import axios from 'axios';
import './ProfileInfo.css'
import { useNavigate, useLocation } from 'react-router-dom';

export function ProfileInfo() {

  // const [username, setUserName] =React.useState('')
  // const [email, setEmail] =React.useState('')
  // const [role, setRole] =React.useState('')

  const username='Kelly';
  const email='dsfsesegsegsg.com';
  const role ='user'

  //获取登录页面传来的userId
  const location = useLocation();
  const userId = location.state.userId;
  console.log("User ID",userId);

  const navigate = useNavigate();

  // React.useEffect(()=>{
  //   axios.get(`http://localhost:8080/user/profile?userId=${userId}`).
  //   then((response)=> {
  //     console.log(response.data);
  //     if(response.data.code==0){
  //       setUserName(response.data.data.username)
  //       setEmail(response.data.data.email)
  //       setRole(response.data.data.role)
  //     }
  //     else{
  //       console.log('No information found')
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }, [userId]);

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      <div className="user-info">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
      <button onClick={() => navigate("/home", { state: { userId} })} className="home-button">Home</button>
    </div>
  )
}

export default ProfileInfo