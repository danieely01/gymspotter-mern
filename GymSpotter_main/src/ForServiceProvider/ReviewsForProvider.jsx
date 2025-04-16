import React, { useEffect, useState, useContext } from 'react';
import styles from "./CSS/ReviewsForProvider.module.css";
import NavigationForProviders from "./NavigationForProviders";
import { AuthContext } from "../context/auth-context";

export default function ReviewReviews() {
  const { userId } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3000/${userId}/ertekelesek_attekintese`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Hiba történt az értékelések lekérésekor:', error));
  }, [userId]);

  return (
    <div className={styles.Komponens}>
      <NavigationForProviders />
      <div className={styles.content}>
        <h1 className={styles.cim}>Értékelések az edzőtermemről 🥰</h1>
        {reviews.length === 0 ? (
          <p className={styles.NoReview}>Még nem érkeztek értékelések!</p>
        ) : (
          <div className={styles.reviewGrid}>
            {reviews.map((review) => (
              <div key={review.Id} className={styles.card}>
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle}>Értékelés</h5>
                  <p className={styles.cardText}>⭐ {review.rating}</p>
                  <p className={styles.cardText}>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}