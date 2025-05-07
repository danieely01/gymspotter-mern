import  { useEffect, useState, useContext } from 'react';
import styles from "./CSS/MyReviews.module.css"; // Moduloknál változót kell használni
import NavigationForUsers from './NavigationForUsers';
import { AuthContext } from "../context/auth-context";

export default function MyReviews() {
  const { userId } = useContext(AuthContext); // userId lekérése a contextből
  console.log("📌 MyReviews - userId a contextből:", userId); 
  const [userReviews, setReviews] = useState([]);
  const [gyms, setGyms] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    console.log(userId);
    if (!userId) return; // Ha nincs bejelentkezve, ne próbáljuk lekérni az adatokat

    console.log("Lekérjük az értékeléseket a userId-vel:", userId); // Debug log

    // API hívás az értékelések lekéréséhez
    fetch(`${apiUrl}/${userId}/ertekeleseim`)
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

    // API hívás az edzőtermek lekéréséhez
    fetch(`${apiUrl}/konditermek`)
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
  }, [userId]); // Az üres tömb biztosítja, hogy csak egyszer fusson le a lekérés

  return (
    <div className={`${styles.Komponens}`}>
      <NavigationForUsers />
      <div className={`${styles.content}`}>
        <h1 className={`${styles.cim} text-center mt-4`}>Értékeléseim 🤷‍♂️</h1>
        <div className={`${styles.content} container`}>
          {userReviews.length > 0 ? (
            <div className="row">
              {userReviews.map((review, index) => {
                // Az edzőterem nevét a gym ID alapján keressük meg a gyms tömbben
                const gym = gyms.find(g => g._id === String(review.gym_id));

                 // Ha nincs ilyen konditerem, akkor ne renderáljuk azt a review-t
                   if (!gym) return null;

                return (
                  <div key={index} className="col-md-6 mb-4">
                    <div className={`card ${styles.reviewCard}`}> {/* Apply reviewCard class */}
                      <div className="card-body">
                        <h5 className={`${styles.cardTitle}`}>
                          {gym ? gym.name : 'Ismeretlen terem'}
                        </h5>
                        <p className={`${styles.cardText}`}>
                        Értékelés: ⭐ {review.rating}
                        </p>
                        <p className={`${styles.cardText}`}>
                          <strong>Vélemény:</strong> {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Nincs meglévő edzőteremről értékelésed. 😢</p>
          )}
        </div>
      </div>
    </div>
  );
}
