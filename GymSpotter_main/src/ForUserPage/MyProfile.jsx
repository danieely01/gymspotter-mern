import React, { useState, useEffect } from "react";
import styles from "./CSS/MyProfile.module.css";
import NavigationForUsers from "./NavigationForUsers";
import { FaUser, FaEnvelope, FaLock, FaKey } from "react-icons/fa";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // Hibaüzenet dobozhoz
  const userId = "1"; // Cseréld ki a bejelentkezett felhasználó ID-jára

  useEffect(() => {
    fetch(`http://localhost:3000/${userId}/profilom`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setEmail(data.email);
      })
      .catch((error) => console.error("Hiba a felhasználói adatok lekérésekor:", error));
  }, [userId]);

  const handleUpdate = () => {
    let errors = {};
    setErrorMessage(""); // Hibaüzenet törlése minden új próbálkozás előtt

    // Email formátum ellenőrzés
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = "Az email mező nem lehet üres!";
    } else if (!emailRegex.test(email)) {
      errors.email = "Érvénytelen email cím!";
    }

    if (!currentPassword) errors.currentPassword = "A jelenlegi jelszó megadása kötelező!";

    if (newPassword && newPassword.length < 6)
      errors.newPassword = "Az új jelszónak legalább 6 karakter hosszúnak kell lennie!";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    fetch(`http://localhost:3000/${userId}/profilom/ellenorzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetch(`http://localhost:3000/${userId}/profilom`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, newPassword }),
          })
            .then((response) => response.json())
            .then((updatedUser) => {
              console.log("Frissített felhasználó:", updatedUser);
              setUser((prevUser) => ({
                ...prevUser,
                ...updatedUser,
              }));
              setFormErrors({});
              setCurrentPassword("");
              setNewPassword("");
            })
            .catch((error) => {
              console.error("Hiba a frissítés során:", error);
              setErrorMessage("Hiba történt a frissítés során, próbáld újra!");
            });
        } else {
          setFormErrors({ currentPassword: "Hibás jelenlegi jelszó!" });
        }
      })
      .catch((error) => {
        console.error("Hiba a jelszó ellenőrzésekor:", error);
        setErrorMessage("Hiba történt a jelszó ellenőrzésekor.");
      });
  };

  return (
    <div className={`${styles.Komponens} ${styles.profileContainer}`}>
      <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
        <NavigationForUsers />
        <div className={`${styles.content} card ${styles.profileCard} shadow-lg p-4`}>
          <h1 className="text-center mb-4">Profilom 👤</h1>

          {/* Hibaüzenetek doboz (ha van hiba) */}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          {user ? (
            <div>
              <p className={`${styles.felhasznalonev}`}>
                <FaUser className="icon" /> <strong>Felhasználónév:</strong> {user.username}
              </p>

              {/* Email mező */}
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
                {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
              </div>

              {/* Jelenlegi jelszó mező */}
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <FaKey />
                </span>
                <input
                  type="password"
                  className={`form-control ${formErrors.currentPassword ? "is-invalid" : ""}`}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Jelenlegi jelszó"
                 
                />
                {formErrors.currentPassword && <div className="invalid-feedback">{formErrors.currentPassword}</div>}
              </div>

              {/* Új jelszó mező */}
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <input
                  type="password"
                  className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Új jelszó"
                />
                {formErrors.newPassword && <div className="invalid-feedback">{formErrors.newPassword}</div>}
              </div>

              {/* Frissítés gomb */}
              <button className="btn btn-primary btn-block mt-3" onClick={handleUpdate}>
                Profil frissítése
              </button>
            </div>
          ) : (
            <p className="text-center">Adatok betöltése...</p>
          )}
        </div>
      </div>
    </div>
  );
}
