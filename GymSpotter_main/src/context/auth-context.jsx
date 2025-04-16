import { createContext } from "react";
import { useState } from "react"; 


export const AuthContext = createContext({isLoggedIn: false, userId: null, userType: null, userName: null, login: (id, type, name) => {}, logout: () => {}});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);
    const [userName, setUserName] = useState(null); // Felhasználó neve

  
    const login = (id, type, name) => {
      console.log("Login függvény meghívva:", id, type, name); // Ellenőrzéshez
      console.log("Bejelentkezés, userId:", id, "userName:", name); // Ellenőrzéshez
      setIsLoggedIn(true);
      setUserId(id);
      setUserType(type);
      setUserName(name); // Felhasználó neve
      console.log("userName frissítve:", name); // Ellenőrzés, hogy itt frissül-e
    };
  
    const logout = () => {
      console.log("Kijelentkezés"); // Ellenőrzéshez
      setIsLoggedIn(false);
      setUserId(null);
      setUserType(null);
      setUserName(null); // Nevet nullázzuk
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, userId, userType, userName, login, logout }}>
        {children}
      </AuthContext.Provider>
    ); 
};