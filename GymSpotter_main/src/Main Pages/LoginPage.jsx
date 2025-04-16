import NavigationForUsers from "../ForUserPage/NavigationForUsers";
import styles from "./CSS/LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { React, useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { FaUser, FaKey } from "react-icons/fa";

function LoginPage() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const GoToRegisterPage = () => {
    navigate("/registerpage");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Hibaüzenet törlése új próbálkozás előtt

    if (username === "" || password === "") {
      setErrorMessage("Minden mezőt ki kell tölteni!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Hibás bejelentkezési adatok!");
      }

      const data = await response.json();
      console.log("Backend válasz:", data); // Ellenőrzéshez
      const { token, userId, userType } = data;
      console.log("Bejelentkezett userId:", userId);

      console.log("Bejelentkezett userId:", userId); // Ellenőrzéshez

      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);

      auth.login(userId, userType); // userId és userType mentése a contextbe


      if (userType === "admin") {
        navigate("/admin", { replace: true });
      } else if (userType === "provider") {
        navigate("/serviceprovider", { replace: true });
      } else {
        navigate("/userpage", { replace: true });
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={`${styles.Komponens}`}>
      <NavigationForUsers />
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="p-4 shadow-lg rounded bg-white">
          <form onSubmit={handleLogin}>
            {/* Hibaüzenet megjelenítése */}
            {errorMessage && (
              <div className="alert alert-danger text-center">{errorMessage}</div>
            )}

            <div id="inputMezok">
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <FaUser />
                </span>
                <input
                  className="form-control"
                  type="text"
                  id="felhasznalonev"
                  placeholder="Felhasználónév"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <FaKey />
                </span>
                <input
                  type="password"
                  id="jelszo"
                  className="form-control"
                  placeholder="Jelszó"
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
            <button className="btn btn-success" onClick={GoToRegisterPage}>
              Regisztráció
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
