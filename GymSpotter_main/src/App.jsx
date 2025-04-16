import "./CSS/App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./LoginPage";
import Home from "./Home";
import RegisterPage from "./RegisterPage";
import UserPage from "./UserPage";

const App = () => {
    return <Router>
    <Routes>
      
      <Route path="/" element={<Home/>} exact/>
      <Route path="loginpage" element={<LoginPage/>} exact/>
      <Route path="registerpage" element={<RegisterPage/>} exact/>
      <Route path="userpage" element={<UserPage/>} exact/>
      <Route path="/*" element={<Navigate to="/" />}/> 
      {/* Ha nem talál keresett path-et, akkor dobjon vissza a főoldalra. */}
    </Routes>
    
  </Router>
}

export default App
