import React, { useEffect, useRef, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./CSS/Gyms.module.css"; // Keep the existing CSS import
import NavigationForUsers from './NavigationForUsers';
import { AuthContext } from '../context/auth-context'; 

export default function Gyms() {
  const { isLoggedIn, userId } = useContext(AuthContext);
  const [gyms, setGyms] = useState([]);
  const [filteredGyms, setFilteredGyms] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [serviceSearch, setServiceSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGym, setSelectedGym] = useState(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(1);
  const scrollPositionRef = useRef(0);

  const navigate = useNavigate();

  const GoToLoginPage = () => {
    navigate("/loginpage");
  };


  useEffect(() => {
    if (selectedGym) {
      console.log("Selected gym (modal):", selectedGym);
    }
  }, [selectedGym]);

  useEffect(() => {
    fetch('http://localhost:3000/konditermek')
      .then((response) => response.json())
      .then((data) => {
        console.log("Kapott konditermek:", data); // EZT ADD HOZZÁ
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

  const openModal = (gym) => {
    scrollPositionRef.current = window.scrollY;
    setSelectedGym(gym);
    setModalOpen(true);
  };

  const closeModal = () => {
    const scrollPosition = window.scrollY;
    setSelectedGym(null);
    setModalOpen(false);
    
    window.scrollTo(0, scrollPositionRef.current);

  };

  const openReviewModal = (gym) => {
    if (!isLoggedIn) {
      GoToLoginPage(); }
    setSelectedGym(gym);
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewText("");
    setReviewRating(1);
    setReviewModalOpen(false);
  };

  const submitReview = () => {
    
    const newReview = {
      userId: userId,
      comment: reviewText,
      rating: reviewRating,
    };
    console.log('selectedGym id-ja:', selectedGym._id);
    console.log('User id-ja:', userId);
    fetch(`http://localhost:3000/konditermek/${selectedGym._id}/ertekeles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview),
    })
    .then(response => response.json())
    .then((updatedGym) => {
      console.log('Frissített edzőterem:', updatedGym);  // Debugging
      setGyms(gyms.map(gym => gym._id === updatedGym._id ? updatedGym : gym));
      setFilteredGyms(filteredGyms.map(gym => gym._id === updatedGym._id ? updatedGym : gym));
      closeReviewModal();
      setSelectedGym(updatedGym);
    })
    .catch((error) => console.error('Error submitting review:', error));
  };



  return (
    <div className={styles.Komponens}>
      <NavigationForUsers />
      <div className={styles.content}>
        <h1 className={styles.cim}>Edzőtermek 🥊</h1>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="🏙 Keresés város alapján"
          className="form-control mb-3"
        />

        <input
          type="text"
          value={serviceSearch}
          onChange={handleServiceSearch}
          placeholder="🧘‍♂️ Szolgáltatás keresése (pl. HIIT, Yoga)"
          className="form-control mb-3"
        />

        <div className="mb-3">
          <select className="form-select" value={sortOption} onChange={handleSortChange}>
            <option value="">📊 Rendezés</option>
            <option value="rating_asc">📈 Értékelés szerint növekvő</option>
            <option value="rating_desc">📉 Értékelés szerint csökkenő</option>
            <option value="price_asc">📈 Ár szerint növekvő</option>
            <option value="price_desc">📉 Ár szerint csökkenő</option>
          </select>
        </div>

        {filteredGyms.length === 0 ? (
          <h3>Nincsenek elérhető edzőtermek. 😢</h3>
        ) : (
          <div className={styles.gymGrid}>
            {filteredGyms.map((gym) => (
              <div key={gym._id} className={styles.card}>
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle}>
                    {gym.gymName}
                    {isLoggedIn && (
                      <span
                        style={{ cursor: 'pointer', marginLeft: '10px', color: isFavorite(gym._id) ? 'red' : 'grey' }}
                        onClick={() => toggleFavorite(gym._id)}
                      >
                        ♥
                      </span>
                    )}
                  </h5>
                  <p className={styles.cardText}>📍 Helyszín: {gym.location}</p>
                  <p className={styles.cardText}>🤸‍♂️ Szolgáltatások: {gym.services.join(', ')}</p>
                  <p className={styles.cardText}>🤷‍♀️ Értékelés: {gym.rating}</p>
                  <p className={styles.cardText}>💲 Ár: {gym.price} HUF</p>
                  <a href="#" className={styles.cardButton} onClick={() => openModal(gym)}>Tovább a részletekhez</a>
                  <a href="#" className={styles.cardButton} onClick={() => openReviewModal(gym)}>Írj értékelést!</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {reviewModalOpen && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <div className={styles.modalHeader}>Írj egy értékelést</div>
      <div className={styles.modalContent}>
        <label>Értékelés (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={reviewRating}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            if (newValue >= 1 && newValue <= 5) {
              setReviewRating(newValue);
            } else {
              setReviewRating(5); // Ha a szám nem érvényes, visszaállítjuk 5-re
            }
          }}
          className={styles.modalInput}
        />
        <label>Vélemény:</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className={styles.modalTextarea}
        ></textarea>
        <div className={styles.modalActions}>
          <button onClick={submitReview} className={styles.modalButton}>Beküldés</button>
          <button onClick={closeReviewModal} className={styles.modalCloseButton}>Mégse</button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Modal */}
      {modalOpen && selectedGym && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>Edzőterem részletei</div>
            <div className={styles.modalContent}>
              <p><strong>Név:</strong> {selectedGym.gymName}</p>
              <p><strong>Helyszín:</strong> {selectedGym.location}</p>
              <p><strong>Szolgáltatások:</strong> {selectedGym.services.join(', ')}</p>
              <p><strong>Értékelés:</strong> {selectedGym.rating}</p>
              <p><strong>Ár:</strong> {selectedGym.price} HUF</p>
              <p><strong>E-mail:</strong> {selectedGym.email}</p>
              <p><strong>Telefonszám:</strong> {selectedGym.phonenumber}</p>

              <div>
  <strong>Vélemények:</strong>
  <table className={styles.reviewsTable}>
    <thead>
      <tr>
        <th>Felhasználó</th>
        <th>Vélemény</th>
        <th>Értékelés</th>
      </tr>
    </thead>
    <tbody>

    {selectedGym.reviews && selectedGym.reviews.length > 0 ? 
    (
      selectedGym.reviews.map((review, index) => (
        <tr key={index}>
          <td><strong>{review.user}</strong></td>
          <td>{review.comment}</td>
          <td>⭐ {review.rating}</td>
        </tr>
      )
      )) : (
          <tr><td colSpan="3">Nincsenek vélemények.</td></tr>
        )
    }


     
    </tbody>
  </table>
</div>
              <button className={styles.modalClose} onClick={closeModal}>Bezárás</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
