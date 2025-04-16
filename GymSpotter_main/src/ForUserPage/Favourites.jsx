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
    if (!userId) return; // Ha nincs bejelentkezve, ne próbáljuk lekérni az adatokat

    console.log("Lekérjük a kedvenceket a userId-vel:", userId); // Debug log

    fetch(`http://localhost:3000/${userId}/kedvencek`)
      .then(response => response.json())
      .then(data => {
        console.log("📌 Kedvencek sikeresen betöltve:", data);
        setFavorites(data);
      })
      .catch(error => console.error('Hiba történt a kedvencek adatainak lekérésekor', error));
  }, [userId]); // Csak akkor fusson le, ha az userId változik
  
  return (
    <div className={styles.Komponens}>
      <NavigationForUsers />
      <div className={styles.content}>
        <h1 className={styles.cim}>Kedvenceim ❤</h1>
        {favorites.length === 0 ? (
          <p className={styles.noFavorites}>Nincsenek elmentve edzőtermek. 😢</p>
        ) : (
          <div className={styles.favoritesGrid}>
            {favorites.map((gym) => (
              <div key={gym.Id} className={styles.card}>
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle}>{gym.name}</h5>
                  <p className={styles.cardText}>📍 Helyszín: {gym.location}</p>
                  <p className={styles.cardText}>🤸‍♂️ Szolgáltatások: {gym.services.join(', ')}</p>
                  <p className={styles.cardText}>🤷‍♀️ Értékelés: {gym.rating}</p>
                  <p className={styles.cardText}>💲 Ár: {gym.price} HUF</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
