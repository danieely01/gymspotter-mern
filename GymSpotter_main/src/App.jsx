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
import { useState, useCallback, React } from "react";
import ManageUsers from "./AdminPages/ManageUsers";
import ManageGyms from "./AdminPages/ManageGyms";
import ManageReviews from "./AdminPages/ManageReviews";
import Statisztika from "./AdminPages/Statisztika";
const App = () => {
  
    
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [userType, setUserType] = useState(null);  // userType tárolása
      const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setIsLoggedIn(true);
      setUserType(storedUserType);
    }
  }, []);

    const login = useCallback((userId, userType) => {
      console.log("🔹 Bejelentkezés: userId:", userId, "userType:", userType);
      setIsLoggedIn(true);
      setUserType(userType);
      setUserId(userId); // 🆕 Frissítjük a `userId`-t a state-ben!
      localStorage.setItem("userId", userId);  
      localStorage.setItem("userType", userType);
      
    }, []);

    const logout = useCallback(() => {
      console.log("🚪 Kijelentkezés");
      setIsLoggedIn(false);
      setUserType(null);
      localStorage.removeItem("userId");  
      localStorage.removeItem("userType");
    }, []);

    // let routes;

    // if (isLoggedIn) {
    //   console.log(userType);
    //   routes = (
    //     <>
    //     {userType === "admin" ? (
    //       <>
    //         <Route path="/admin" element={<AdminPage />} />
    //         <Route path="/admin/felhasznalok_kezelese" element={<ManageUsers/>} exact/>
    //         <Route path="/admin/konditermek_kezelese" element={<ManageGyms/>} exact/>
    //         <Route path="/admin/ertekelesek_kezelese" element={<ManageReviews/>} exact/>
    //         <Route path="/admin/statisztika" element={<Statisztika/>} exact/>
    //         {/* <Route path="/" element={<UserPage/>} exact/> */}

       
    //       </>

    //     ) : userType === "provider" ? (
    //       <>
    //       <Route path="/serviceprovider" element={<ServiceProvider/>} exact/>
    //       <Route path="/serviceprovider/edzotermem" element={<MyGym2/>} exact/>
    //       <Route path="/:providerid/ertekelesek_attekintese" element={<ReviewsForProvider/>} exact/>
    //       <Route path="/serviceprovider/kapcsolat" element={<ContactForServiceProvider/>} exact/>
       

    //       </>
    //     ) : (
    //       <>
    //       <Route path="/userpage" element={<UserPage/>} exact/>
    //       <Route path="/edzotermek" element={<Gyms/>} exact/>
    //       <Route path="/kedvencek" element={<Favourites/>} exact/>
    //       <Route path="/kapcsolat" element={<Contact/>} exact/>
    //       <Route path="/ertekeleseim" element={<MyReviews/>} exact/>
    //       <Route path="/profilom" element={<MyProfile/>} exact/>
    //       </>
    //     )}
    

    //       </>

    //   );
    // } else {
    //   routes = (
    //     <>
    //     <Route path="/" element={<UserPage/>} exact/>
    //     <Route path="/loginpage" element={<LoginPage/>} exact/>
    //     <Route path="registerpage" element={<RegisterPage/>} exact/>
    //     <Route path="userpage" element={<UserPage/>} exact/>
    //     <Route path="edzotermek" element={<Gyms/>} exact/>
    //     <Route path="kapcsolat" element={<Contact/>} exact/>
    //     <Route path="/*" element={<UserPage/>} exact/>
    //     </>

    //   );
    // }

    console.log("isLoggedIn:", isLoggedIn);
console.log("userType:", userType);
    return   (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId,  userType: userType,  login: login, logout: logout}}>
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
