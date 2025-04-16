import NavigationForUsers from "../ForUserPage/NavigationForUsers";
import styles from "./CSS/LoginPage.module.css"; // Moduloknál változót kell használni
import { useNavigate } from 'react-router-dom';
import { React, useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useEffect } from "react";



function LoginPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const GoToRegisterPage = () => {
      navigate('/registerpage');
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const handleLogin = async (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }


    try {
      // Backend autentikációs kérés
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log("response status:", response.status); // Logolj a státuszt
      if (!response.ok) {
        throw new Error("Hibás bejelentkezési adatok!");
      }
  
      const data = await response.json();
      
  
      // JWT token tárolása
      const { token, userType } = data; // userType lehet: 'admin', 'provider', 'user'
      localStorage.setItem("token", token);  // Tároljuk a tokent a helyi tárolóban
      console.log("bejelentkezes sikeres " + userType)
        // Bejelentkezési állapot frissítése
        auth.login();  // auth context frissítése
        localStorage.setItem("userType", userType);


      if (userType === "admin") {
     
        navigate("/admin", { replace: true });
      } else if (userType === "provider") {
        
        navigate("/serviceprovider", { replace: true });
      } else {
  
        navigate("/userpage", { replace: true });
      }


      
  
    } catch (error) {
      alert(error.message);
    }
  };




  return (
    <div className={`${styles.Komponens}`}>
    <NavigationForUsers/>
    <div className={`container d-flex justify-content-center align-items-center min-vh-100`}>
      <div className="p-4 shadow-lg rounded bg-white">
        <form onSubmit={handleLogin}>
          <div id="inputMezok">
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                id="felhasznalonev"
                placeholder="Felhasználónév"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                id="jelszo"
                className="form-control"
                placeholder="Jelszó"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

         
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-dark" type="submit">
              Bejelentkezés
            </button>
          </div>
        </form>
            <div className="d-grid gap-2 mt-3">
            <button className="btn btn-success" onClick={GoToRegisterPage}>Regisztráció</button>
            </div>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
