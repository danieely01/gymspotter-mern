import styles from "./CSS/RegisterPage.module.css"; // Moduloknál változót kell használni
import NavigationForUsers from "../ForUserPage/NavigationForUsers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("user"); // Új állapot a regisztrációs típus tárolására
  const navigate = useNavigate();


  const handleRegister = (event) => {
    event.preventDefault();
    if (username === "" || password === "" || email === "") {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }
    // Handle registration logic (e.g., send data to backend to create a new user)
    // After successful registration, redirect to login page
    console.log("User registered:", { username, password, email, userType });
    navigate("/loginpage");
  };
  return (
    <div className={`${styles.Komponens}`}>
      <NavigationForUsers />
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="p-4 shadow-lg rounded bg-white">
          <form onSubmit={handleRegister}>
            <h2>Regisztráció</h2>
            <div id="inputMezok">
              <div className="mb-3">
                <input
                  className="form-control"
                  type="text"
                  id="felhasznalonev"
                  placeholder="Felhasználóneved"
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

              <div className="mb-3">
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <label>Válaszd ki a regisztráció típusát:</label><br />
              <input
                type="radio"
                id="user"
                name="userType"
                value="user"
                checked={userType === "user"}
                onChange={(e) => setUserType(e.target.value)}
              />
              <label htmlFor="user">Felhasználó</label><br />
              <input
                type="radio"
                id="provider"
                name="userType"
                value="provider"
                checked={userType === "provider"}
                onChange={(e) => setUserType(e.target.value)}
              />
              <label htmlFor="provider">Szolgáltató</label>
            </div>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-dark" type="submit">
                Regisztrálok
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage
