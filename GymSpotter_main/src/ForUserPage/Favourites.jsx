import React, { useEffect, useState } from 'react';
import styles from "./CSS/Favourites.module.css";
import NavigationForUsers from './NavigationForUsers';

export default function Favourites() {
  const [favorites, setFavorites] = useState([]);

  const userId = 1; // Ide a valós userId kell

  useEffect(() => {
    fetch(`http://localhost:3000/${userId}/kedvencek`)
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => console.error('Error fetching favorites:', error));
  }, []);

  return (
    <div className={`${styles.Komponens}`}>
      <NavigationForUsers />
      <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
        <h1>Kedvenceim</h1>
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
                    <p className="card-text">Helyszín: {gym.location}</p>
                    <p className="card-text">Szolgáltatások: {gym.services.join(', ')}</p>
                    <p className="card-text">Értékelés: {gym.rating}</p>
                    <p className="card-text">Ár: {gym.price} HUF</p>
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