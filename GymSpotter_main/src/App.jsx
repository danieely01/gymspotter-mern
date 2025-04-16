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
import ContactForServiceProvider from "./Main Pages/ContactForServiceProvider";
import { AuthContext } from "./context/auth-context";
import { useState, useCallback, React } from "react";
import ManageUsers from "./AdminPages/ManageUsers";
import ManageGyms from "./AdminPages/ManageGyms";
import ManageReviews from "./AdminPages/ManageReviews";
import Statisztika from "./AdminPages/Statisztika";
const App = () => {

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
  }, []);

  
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);  // userType tárolása

    const login = useCallback(() => {
      setIsLoggedIn(true);
      const storedUserType = localStorage.getItem("userType");
      console.log("UserType in localStorage:", localStorage.getItem("userType"));

      setUserType(storedUserType);  // Frissítjük a userType-ot
    }, []);

    const logout = useCallback(() => {
      setIsLoggedIn(false);
      localStorage.removeItem("userType");
    }, []);

    let routes;

    if (isLoggedIn) {
      console.log(userType);
      routes = (
        <>
        {userType === "admin" ? (
          <>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/felhasznalok_kezelese" element={<ManageUsers/>} exact/>
            <Route path="/admin/konditermek_kezelese" element={<ManageGyms/>} exact/>
            <Route path="/admin/ertekelesek_kezelese" element={<ManageReviews/>} exact/>
            <Route path="/admin/statisztika" element={<Statisztika/>} exact/>
            {/* <Route path="/" element={<UserPage/>} exact/> */}

       
          </>

        ) : userType === "provider" ? (
          <>
          <Route path="/serviceprovider" element={<ServiceProvider/>} exact/>
          <Route path="/serviceprovider/edzotermem" element={<MyGym2/>} exact/>
          <Route path="/:providerid/ertekelesek_attekintese" element={<ReviewsForProvider/>} exact/>
          <Route path="/serviceprovider/kapcsolat" element={<ContactForServiceProvider/>} exact/>
       

          </>
        ) : (
          <>
          <Route path="/userpage" element={<UserPage/>} exact/>
          <Route path="/edzotermek" element={<Gyms/>} exact/>
          <Route path="/kedvencek" element={<Favourites/>} exact/>
          <Route path="/kapcsolat" element={<Contact/>} exact/>
          <Route path="/ertekeleseim" element={<MyReviews/>} exact/>
          <Route path="/profilom" element={<MyProfile/>} exact/>
          </>
        )}
    

          </>

      );
    } else {
      routes = (
        <>
        <Route path="/" element={<UserPage/>} exact/>
        <Route path="/loginpage" element={<LoginPage/>} exact/>
        <Route path="registerpage" element={<RegisterPage/>} exact/>
        <Route path="userpage" element={<UserPage/>} exact/>
        <Route path="edzotermek" element={<Gyms/>} exact/>
        <Route path="kapcsolat" element={<Contact/>} exact/>
        <Route path="/*" element={<UserPage/>} exact/>
        </>

      );
    }

    console.log("isLoggedIn:", isLoggedIn);
console.log("userType:", userType);
    return   (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
      <Router>
        <Routes>
          {routes}
        </Routes>
      </Router>
    </AuthContext.Provider>)
}

export default App
