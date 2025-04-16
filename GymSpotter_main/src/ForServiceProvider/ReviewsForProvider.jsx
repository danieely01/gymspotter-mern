
import React, { useEffect, useState, useContext } from 'react';
import styles from "../Main Pages/CSS/ServiceProvider.module.css";
import NavigationForProviders from "./NavigationForProviders";
import { AuthContext } from "../context/auth-context";



export default function ReviewReviews() {
  const { userId } = useContext(AuthContext); // userId lekérése a contextből
  console.log("📌 Vélemények a konditermemről - providerId a contextből:", userId); 

  const [reviews, setReviews] = useState([]);



   useEffect(() => {
    console.log(userId);
    if (!userId) return; // Ha nincs bejelentkezve, ne próbáljuk lekérni az adatoka
      
    console.log("Lekérjük a véleményeket a userId-vel:", userId); // Debug log
    
    
    fetch(`http://localhost:3000/${userId}/ertekelesek_attekintese`)
        .then(response => response.json())
        .then(data => setReviews(data))
        .catch(error => console.error('Hiba történt az értékelések adatainak lekérésekor:', error));
    }, [userId]);
    
    
  return (
      <div className={`${styles.Komponens}`}>
        <NavigationForProviders/>
        <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
          <h1 className={`${styles.cim}  text-center mb-4`}>Értékelések</h1>
          {reviews.length === 0 ? (
            <p>Még nem érkeztek értékelések!</p>
          ) : (
            <div className="row">
              {reviews.map((review) => (
                <div key={review._id} className="col-md-4 mb-4">
                  <div className="card">
                    {/* <img src="https://via.placeholder.com/150" className="card-img-top" alt={gym.name} /> */}
                    <div className="card-body">
                      <h5 className="card-title">Értékelés</h5>
                      <p className="card-text">Csillag: {review.rating}</p>
                      <p className="card-text">Megjegyzés: {review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
}
