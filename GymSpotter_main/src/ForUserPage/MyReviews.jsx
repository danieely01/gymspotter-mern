import React, { useEffect, useState, useContext  } from 'react';
import styles from "./CSS/MyReviews.module.css"; // Moduloknál változót kell használni
import NavigationForUsers from './NavigationForUsers';
import { AuthContext } from "../context/auth-context";

export default function MyReviews() {
  const { userId } = useContext(AuthContext); // userId lekérése a contextből
  console.log("📌 MyReviews - userId a contextből:", userId); 
  const [userReviews, setReviews] = useState([]);
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    console.log(userId);
    if (!userId) return; // Ha nincs bejelentkezve, ne próbáljuk lekérni az adatoka

    console.log("Lekérjük az értékeléseket a userId-vel:", userId); // Debug log

    // API hívás az értékelések lekéréséhez
    fetch(`http://localhost:3000/${userId}/ertekeleseim`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Hiba történt az értékelések lekérésekor');
        }
        return response.json();
      })
      .then(data => {
        console.log("📌 Értékelések sikeresen betöltve:", data);
        setReviews(data); // Az értékelések állapotba mentése
      })
      .catch(error => {
        console.error(error);
      });
      fetch('http://localhost:3000/konditermek') // Feltételezve, hogy létezik egy endpoint, ami az összes edzőterem adatát visszaadja
      .then(response => {
        if (!response.ok) {
          throw new Error('Hiba történt az edzőtermek adatainak lekérésekor');
        }
        return response.json();
      })
      .then(data => {
        setGyms(data); // Az edzőtermeket a frontend állapotába mentjük
      })
      .catch(error => {
        console.error('Hiba:', error);
      });
  }, []); // Az üres tömb biztosítja, hogy csak egyszer fusson le a lekérés


  return (
    <div className={`${styles.Komponens}`}>
      <NavigationForUsers />
    <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
        <h1 className={`${styles.cim} text-center mb-4`}>Értékeléseim 🤷‍♂️</h1>
      <div className={`${styles.content}`}>
        {userReviews.length > 0 ? (
          <div className="row">
            {userReviews.map((review, index) => {
              // Az edzőterem nevét a gym ID alapján keressük meg a gyms tömbben
              const gym = gyms.find(g => g._id === String(review.gym));
              return (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        {gym ? gym.name : 'Ismeretlen terem'}
                      </h5>
                      <p className="card-text">
                        <strong>Értékelés:</strong> {review.rating}
                      </p>
                      <p className="card-text">
                        <strong>Vélemény:</strong> {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Nincs meglévő értékelésed.</p>
        )}
      </div>
    </div>
  </div>
  
  );
}
