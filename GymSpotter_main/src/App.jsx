import "./Main Pages/CSS/App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./Main Pages/LoginPage";

import RegisterPage from "./Main Pages/RegisterPage";
import UserPage from "./Main Pages/UserPage";
import Gyms from "./ForUserPage/Gyms";
import Favourites from "./ForUserPage/Favourites";
import Contact from "./ForUserPage/Contact";
import MyReviews from "./ForUserPage/MyReviews";
import MyProfile from "./ForUserPage/MyProfile";
import AdminPage from "./Main Pages/AdminPage";
const App = () => {
    return <Router>
      
    <Routes>
      
      <Route path="/" element={<UserPage/>} exact/>
      <Route path="/loginpage" element={<LoginPage/>} exact/>
      <Route path="registerpage" element={<RegisterPage/>} exact/>
      <Route path="userpage" element={<UserPage/>} exact/>
      <Route path="edzotermek" element={<Gyms/>} exact/>
      <Route path="kedvencek" element={<Favourites/>} exact/>
      <Route path="kapcsolat" element={<Contact/>} exact/>
      <Route path="ertekeleseim" element={<MyReviews/>} exact/>
      <Route path="profilom" element={<MyProfile/>} exact/>
      <Route path="admin" element={<AdminPage/>} exact/>
      <Route path="/*" element={<Navigate to="/userpage" />}/> 
      {/* Ha nem talál keresett path-et, akkor dobjon vissza a főoldalra. */}
    </Routes>
    
  </Router>
}

export default App
