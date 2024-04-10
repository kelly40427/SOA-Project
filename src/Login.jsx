import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginStatus, setLoginStatus] = React.useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          // 注意：在實際應用中，通過GET請求的URL傳遞敏感信息（如用戶名和密碼）是不安全的
          const response = await axios.get(`http://yourbackend.endpoint/login`, {
            params: {
              username: username,
              password: password,
            }
          });
    
          if (response.status === 200) {
            const data = response.data;
            localStorage.setItem('userId', data.userId); // 儲存userId，假設後端響應中包含userId
            setLoginStatus('Login successful!');
            navigate('/homepage'); // 登入成功後跳轉到主頁
          } else {
            setLoginStatus('Login failed.');
          }
        } catch (error) {
          console.error('Login error:', error);
          setLoginStatus('Login failed.');
        }
      };
  return (
    <div>
    <h2>Login Page</h2>
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
      <button type="submit">Login</button>
    </form>
    <p>{loginStatus}</p>
  </div>
  )
}

export default Login