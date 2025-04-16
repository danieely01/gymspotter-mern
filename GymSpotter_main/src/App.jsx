import "./Main Pages/CSS/App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

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
import MyGym from "./Main Pages/MyGym";
import ReviewReviews from "./Main Pages/ReviewReviews";
import ContactForServiceProvider from "./Main Pages/ContactForServiceProvider";
import { AuthContext } from "./context/auth-context";
import { useState, useCallback, React } from "react";
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);  // userType tárolása

    const login = useCallback(() => {
      setIsLoggedIn(true);
      const storedUserType = localStorage.getItem("userType");
      setUserType(storedUserType);  // Frissítjük a userType-ot
    }, []);

    const logout = useCallback(() => {
      setIsLoggedIn(false);
      localStorage.removeItem("userType");
    }, []);

    let routes;

    if (isLoggedIn) {
      routes = (
        <>
        {userType === "admin" ? (
          <>
            <Route path="admin" element={<AdminPage />} />
            <Route path="/*" element={<AdminPage/>} exact/>
          </>

        ) : userType === "provider" ? (
          <>
          <Route path="serviceprovider" element={<ServiceProvider/>} exact/>
          <Route path="serviceprovider/edzotermem" element={<MyGym/>} exact/>
          <Route path="serviceprovider/ertekelesek_attekintese" element={<ReviewReviews/>} exact/>
          <Route path="serviceprovider/kapcsolat" element={<ContactForServiceProvider/>} exact/>
       

          </>
        ) : (
          <>
          <Route path="userpage" element={<UserPage/>} exact/>
          <Route path="edzotermek" element={<Gyms/>} exact/>
          <Route path="kedvencek" element={<Favourites/>} exact/>
          <Route path="kapcsolat" element={<Contact/>} exact/>
          <Route path="ertekeleseim" element={<MyReviews/>} exact/>
          <Route path="profilom" element={<MyProfile/>} exact/>
       

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
