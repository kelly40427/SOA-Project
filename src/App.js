import './App.css';
import { Navigate, Route, Routes, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Order from './Order';
import Home from './Home';
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </Router>
 
  );
}

export default App;
