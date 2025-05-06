import styles from "./CSS/RegisterPage.module.css";
import NavigationForUsers from "../ForUserPage/NavigationForUsers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Ikonok importálása

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("user");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;


  const handleRegister = async (event) => {
    event.preventDefault();
    
    if (!username || !password || !email) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, type: userType }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/loginpage");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Hiba a regisztráció során:", error);
    }
  };

  return (
    <div className={`${styles.Komponens}`}>
      <NavigationForUsers />
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="p-4 shadow-lg rounded bg-white">
          <form onSubmit={handleRegister}>
            <h2 className="text-center">Regisztráció</h2>
            <div id="inputMezok">
              {/* Felhasználónév mező ikon */}
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <FaUser />
                </span>
                <input
                  className="form-control"
                  type="text"
                  id="felhasznalonev"
                  placeholder="Felhasználónév"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Email mező ikon */}
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Jelszó mező ikon */}
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <input
                  type="password"
                  id="jelszo"
                  className="form-control"
                  placeholder="Jelszó"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Felhasználói típus választás */}
              <div className="mb-3">
                <label><strong>Válaszd ki a regisztráció típusát:</strong></label><br />
                <div className="form-check">
                  <input
                    type="radio"
                    id="user"
                    name="userType"
                    value="user"
                    className="form-check-input"
                    checked={userType === "user"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <label htmlFor="user" className="form-check-label">Felhasználó</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="provider"
                    name="userType"
                    value="provider"
                    className="form-check-input"
                    checked={userType === "provider"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <label htmlFor="provider" className="form-check-label">Szolgáltató</label>
                </div>
              </div>
            </div>

            {/* Regisztrációs gomb */}
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

export default RegisterPage;
