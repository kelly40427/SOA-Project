import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import'./Login.css';


export function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole]=React.useState('');
    const navigate = useNavigate();
    console.log(username);
    
    const handleLogin = (event) => {
      event.preventDefault();//防止表单默认行为
      console.log("user login");
      console.log("inside the handleLogin:",username,password,role);
      axios.get(`http://localhost:8080/user/login?username=${username}&password=${password}&role=${role}`).
      then((response) => {
        console.log(response.data);
        if (response.data.code === 0) {
          console.log("User ID:", response.data.data.id);
          // Navigate to different paths based on role
          if (role === 'admin') {
            // Admin Dashboard Route (example)
            navigate("/admin", { state: { userId: response.data.data.id } });
          } else {
            // User Home Route (example)
            navigate("/home", { state: { userId: response.data.data.id } });
          }
        } else {
          // Handle login failure
          console.error("Login failed:", response.data.message);
          // Optionally show an error message to the user here
        }
      });
    };

    return (
        <div className ="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
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
            <div>
              <label>
                Role:<select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </label>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      );
}