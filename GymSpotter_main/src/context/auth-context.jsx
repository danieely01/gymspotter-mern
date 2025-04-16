import { createContext } from "react";

export const AuthContext = createContext({isLoggedIn: false, userId: null, userType: null, login: (id, type) => {}, logout: () => {}});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);

  
    const login = (id, type) => {
      console.log("Bejelentkezés, userId:", id); // Ellenőrzéshez
      setIsLoggedIn(true);
      setUserId(id);
      setUserType(type);
    };
  
    const logout = () => {
      console.log("Kijelentkezés"); // Ellenőrzéshez
      setIsLoggedIn(false);
      setUserId(null);
      setUserType(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
    };
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, userId, userType, login, logout }}>
        {children}
      </AuthContext.Provider>
    ); 
};