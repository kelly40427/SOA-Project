import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    // const [loginStatus, setLoginStatus] = React.useState('');
    const [role, setRole]=React.useState('');
    const navigate = useNavigate();
    console.log(username);
    
    const handleLogin = (event) => {
      event.preventDefault();//防止表单默认行为
      console.log("user login");
      console.log("inside the handleLogin:",username,password,role);
      axios.get(`http://localhost:8080/user/login?username=${username}&password=${password}&role=user`).
      then((response) => {
        console.log(response.data);
        if (response.data.code==0){
          console.log("userId",response.data.data.id);
          navigate("/home", { state: { userId: response.data.data.id} })
        }
      });
    };
  return (
    <div>
    <h2>Login Page</h2>
    <form id="loginform" onSubmit={handleLogin}>
      <div>
        <label>
          Username:<input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:<input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
  )
}

export default Login