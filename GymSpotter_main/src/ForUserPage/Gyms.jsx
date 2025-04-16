import React, { useEffect, useState, useContext } from 'react';
import styles from "./CSS/Gyms.module.css";
import NavigationForUsers from './NavigationForUsers';
import { AuthContext } from '../context/auth-context';  // Import the AuthContext

export default function Gyms() {
  const { isLoggedIn } = useContext(AuthContext);  // Use the AuthContext to check login status
  const [gyms, setGyms] = useState([]);
  const [filteredGyms, setFilteredGyms] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState(""); 
  const [sortOption, setSortOption] = useState(""); 
  const [serviceSearch, setServiceSearch] = useState(""); 
  const userId = 1; 

  useEffect(() => {
    fetch('http://localhost:3000/konditermek')
      .then((response) => response.json())
      .then((data) => {
        setGyms(data);
        setFilteredGyms(data);
      })
      .catch((error) => console.error('Error fetching gyms:', error));

    fetch(`http://localhost:3000/${userId}/kedvencek`)
      .then((response) => response.json())
      .then((data) => setFavorites(data.map(gym => gym._id)))
      .catch((error) => console.error('Error fetching favorites:', error));
  }, []);

  const toggleFavorite = (gymId) => {
    if (!isLoggedIn) {
      alert("Be kell jelentkezned, hogy kedvencet adhass hozzá!");
      return;
    }

    if (favorites.includes(gymId)) {
      fetch(`http://localhost:3000/${userId}/kedvenc/${gymId}`, { method: 'DELETE' })
        .then(() => setFavorites(favorites.filter(id => id !== gymId)))
        .catch((error) => console.error('Error removing favorite:', error));
    } else {
      fetch(`http://localhost:3000/${userId}/kedvenc/${gymId}`, { method: 'POST' })
        .then(() => setFavorites([...favorites, gymId]))
        .catch((error) => console.error('Error adding favorite:', error));
    }
  };

  const isFavorite = (gymId) => favorites.includes(gymId);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterGyms(e.target.value, serviceSearch);
  };

  const handleServiceSearch = (e) => {
    setServiceSearch(e.target.value);
    filterGyms(search, e.target.value);
  };

  const filterGyms = (city, service) => {
    let filtered = gyms.filter(gym => gym.location.toLowerCase().includes(city.toLowerCase()));

    if (service) {
      filtered = filtered.filter(gym => gym.services.some(s => s.toLowerCase().includes(service.toLowerCase())));
    }

    setFilteredGyms(filtered);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    let sortedGyms;
    if (e.target.value === "rating_asc") {
      sortedGyms = [...filteredGyms].sort((a, b) => a.rating - b.rating);
    } else if (e.target.value === "rating_desc") {
      sortedGyms = [...filteredGyms].sort((a, b) => b.rating - a.rating);
    } else if (e.target.value === "price_asc") {
      sortedGyms = [...filteredGyms].sort((a, b) => a.price - b.price);
    } else if (e.target.value === "price_desc") {
      sortedGyms = [...filteredGyms].sort((a, b) => b.price - a.price);
    }
    setFilteredGyms(sortedGyms);
  };

  return (
    <div className={`${styles.Komponens}`}>
      <NavigationForUsers />
      <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
        <h1>Edzőtermek</h1>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Keresés város alapján"
          className="form-control mb-3"
        />

        <input
          type="text"
          value={serviceSearch}
          onChange={handleServiceSearch}
          placeholder="Szolgáltatás keresése (pl. HIIT, Yoga)"
          className="form-control mb-3"
        />

        <div className="mb-3">
          <select className="form-select" value={sortOption} onChange={handleSortChange}>
            <option value="">Rendezés</option>
            <option value="rating_asc">Értékelés szerint növekvő</option>
            <option value="rating_desc">Értékelés szerint csökkenő</option>
            <option value="price_asc">Ár szerint növekvő</option>
            <option value="price_desc">Ár szerint csökkenő</option>
          </select>
        </div>

        <div className="row">
          {filteredGyms.map((gym) => (
            <div key={gym._id} className="col-md-4 mb-4">
              <div className="card">
                <img src="https://via.placeholder.com/150" className="card-img-top" alt={gym.name} />
                <div className="card-body">
                  <h5 className="card-title">
                    {gym.name}
                    {isLoggedIn && (
  <span
    style={{ cursor: 'pointer', marginLeft: '10px', color: isFavorite(gym._id) ? 'red' : 'grey' }}
    onClick={() => toggleFavorite(gym._id)}
  >
    ♥
  </span>
)}
                  </h5>
                  <p className="card-text">Helyszín: {gym.location}</p>
                  <p className="card-text">Szolgáltatások: {gym.services.join(', ')}</p>
                  <p className="card-text">Értékelés: {gym.rating}</p>
                  <p className="card-text">Ár: {gym.price} HUF</p>
                  <a href="#" className="btn btn-primary">Tovább a részletekhez</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
