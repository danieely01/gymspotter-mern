import NavigationForUsers from "../ForUserPage/NavigationForUsers";
import styles from "./CSS/LoginPage.module.css"; // Moduloknál változót kell használni
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function LoginPage() {

  const navigate = useNavigate();

  const GoToRegisterPage = () => {
      navigate('/registerpage');
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const handleLogin = (event) => {
    event.preventDefault();
    if (username === "admin" && password === "admin") {
      navigate("/admin");
    } else if (username.includes("konditerem@gmail")) {
      navigate("/szolgaltato");
    } else {
      alert("Hibás bejelentkezési adatok!");
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

          <div className="text-end">
            <a href="/elfelejtettjelszo" className="text-decoration-none">
              Elfelejtett jelszó?
            </a>
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
