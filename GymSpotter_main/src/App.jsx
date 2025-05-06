import "./Main Pages/CSS/App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./Main Pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import RegisterPage from "./Main Pages/RegisterPage";
import UserPage from "./Main Pages/UserPage";
import Gyms from "./ForUserPage/Gyms";
import Favourites from "./ForUserPage/Favourites";
import Contact from "./ForUserPage/Contact";
import MyReviews from "./ForUserPage/MyReviews";
import MyProfile from "./ForUserPage/MyProfile";
import AdminPage from "./Main Pages/AdminPage";
import ServiceProvider from "./Main Pages/ServiceProvider";
import MyGym2 from "./ForServiceProvider/MyGym2";
import ReviewsForProvider from "./ForServiceProvider/ReviewsForProvider";
import ContactForServiceProvider from "./ForServiceProvider/ContactForServiceProvider";
import { AuthContext } from "./context/auth-context";
import { useState, useCallback} from "react";
import ManageUsers from "./AdminPages/ManageUsers";
import ManageGyms from "./AdminPages/ManageGyms";
import ManageReviews from "./AdminPages/ManageReviews";
import Statisztika from "./AdminPages/Statisztika";
const App = () => {
  
    
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [userType, setUserType] = useState(null);  
      const [userId, setUserId] = useState(localStorage.getItem("userId"));
      const [userName, setUserName] = useState(null); 

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    const storedUserName = localStorage.getItem("userName");
    if (storedUserType) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
      setUserName(storedUserName);
    }
  }, []);

  const login = useCallback((userId, userType, userName) => {
    console.log("🔹 Bejelentkezés: userId:", userId, "userType:", userType, "userName:", userName); // debug
    setIsLoggedIn(true);
    setUserType(userType);
    setUserId(userId);
    setUserName(userName); 
    localStorage.setItem("userId", userId);  
    localStorage.setItem("userType", userType);
    localStorage.setItem("userName", userName); 
  }, []);

    const logout = useCallback(() => {
      console.log("🚪 Kijelentkezés"); // debug
      setIsLoggedIn(false);
      setUserType(null);
      setUserName(null); // userName nullázása
      localStorage.removeItem("userId");  
      localStorage.removeItem("userType");
      localStorage.removeItem("userName"); 
    }, []);

    
    console.log("isLoggedIn:", isLoggedIn); // debug
console.log("userType:", userType); // debug
    return   (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId,  userType: userType, userName: userName,  login: login, logout: logout}}>
      <Router>
      <Routes>
  {isLoggedIn && userType === "admin" && (
    <>
      <Route path="/" element={<AdminPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/felhasznalok_kezelese" element={<ManageUsers />} />
      <Route path="/admin/konditermek_kezelese" element={<ManageGyms />} />
      <Route path="/admin/ertekelesek_kezelese" element={<ManageReviews />} />
      <Route path="/admin/statisztika" element={<Statisztika />} />
      <Route path="/*" element={<Navigate to="/admin" />} />
    </>
  )}
  
  {isLoggedIn && userType === "provider" && (
    <>
      <Route path="/" element={<ServiceProvider />} />
      <Route path="/serviceprovider" element={<ServiceProvider />} />
      <Route path="/serviceprovider/edzotermem" element={<MyGym2 />} />
      <Route path="/:providerid/ertekelesek_attekintese" element={<ReviewsForProvider />} />
      <Route path="/serviceprovider/kapcsolat" element={<ContactForServiceProvider />} />
      <Route path="/*" element={<Navigate to="/serviceprovider" />} />

      
    </>
  )}

  {isLoggedIn && userType === "user" && (
    <>
      <Route path="/" element={<UserPage />} />
      <Route path="/userpage" element={<UserPage />} />
      <Route path="/edzotermek" element={<Gyms />} />
      <Route path="/kedvencek" element={<Favourites />} />
      <Route path="/kapcsolat" element={<Contact />} />
      <Route path="/ertekeleseim" element={<MyReviews />} />
      <Route path="/profilom" element={<MyProfile />} />
      <Route path="/*" element={<Navigate to="/userpage" />} />

    </>
  )}

  {!isLoggedIn && (
    <>
      <Route path="/" element={<UserPage />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/registerpage" element={<RegisterPage />} />
      <Route path="/userpage" element={<UserPage />} />
      <Route path="/edzotermek" element={<Gyms />} />
      <Route path="/kapcsolat" element={<Contact />} />
      <Route path="/*" element={<UserPage />} />
    </>
  )}
</Routes>

      </Router>
    </AuthContext.Provider>)
}

export default App
