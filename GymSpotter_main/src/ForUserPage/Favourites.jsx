import React, { useEffect, useState, useContext } from 'react';
import styles from "./CSS/Favourites.module.css";
import NavigationForUsers from './NavigationForUsers';
import { AuthContext } from "../context/auth-context";

export default function Favourites() {
  const { userId } = useContext(AuthContext); // userId lekérése a contextből
  console.log("📌 Favourites - userId a contextből:", userId); 
  const [favorites, setFavorites] = useState([]);
  
  
  
  useEffect(() => {
    console.log(userId);
    if (!userId) return; // Ha nincs bejelentkezve, ne próbáljuk lekérni az adatoka

    console.log("Lekérjük a kedvenceket a userId-vel:", userId); // Debug log

    
    fetch(`http://localhost:3000/${userId}/kedvencek`)
      .then(response => response.json())
      .then(data => {
        
        console.log("📌 Kedvencek sikeresen betöltve:", data);
        
        setFavorites(data)})
      .catch(error => console.error('Hiba történt az értékelések adatainak lekérésekor', error));
  }, [userId]); // Csak akkor fusson le, ha az userId változik
 
  return (
    <div className={`${styles.Komponens}`}>
      <NavigationForUsers />
      <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
        <h1 className={`${styles.cim} text-center mb-4`}>Kedvenceim ❤</h1>
        {favorites.length === 0 ? (
          <p>Nincsenek elmentve edzőtermek.</p>
        ) : (
          <div className="row">
            {favorites.map((gym) => (
              <div key={gym._id} className="col-md-4 mb-4">
                <div className="card">
                  {/* <img src="https://via.placeholder.com/150" className="card-img-top" alt={gym.name} /> */}
                  <div className="card-body">
                    <h5 className="card-title">{gym.name}</h5>
                    <p className="card-text">📍 Helyszín: {gym.location}</p>
                    <p className="card-text">🤸‍♂️ Szolgáltatások: {gym.services.join(', ')}</p>
                    <p className="card-text">🤷‍♀️ Értékelés: {gym.rating}</p>
                    <p className="card-text">💲 Ár: {gym.price} HUF</p>
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