
import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from "react-router-dom";
import styles from "./CSS/NavigationForProviders.module.css";
import NavigationForProviders from "./NavigationForProviders";


export default function ReviewReviews() {
  const [reviews, setReviews] = useState([]);

  const providerId = 5;

   useEffect(() => {
      fetch(`http://localhost:3000/${providerId}/ertekelesek_attekintese`)
        .then(response => response.json())
        .then(data => setReviews(data))
        .catch(error => console.error('Error fetching favorites:', error));
    }, []);
    
    
  return (
      <div className={`${styles.Komponens}`}>
        <NavigationForProviders/>

        <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
          <h1>Értékelések</h1>
          {reviews.length === 0 ? (
            <p>Még nem érkeztek értékelések!.</p>
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
