import React, { useEffect, useState } from "react";
import NavigationForAdmin from "./NavigationForAdmin";
import styles from "./CSS/ManageReviews.module.css";

function ManageReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // API hívás, hogy lekérjük az összes értékelést
        fetch('http://localhost:3000/admin/ertekelesek_kezelese')
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);

    const handleDelete = (reviewId) => {
        // API hívás az értékelés törlésére
        fetch(`http://localhost:3000/admin/ertekeles_torles/${reviewId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                // Frissítjük a listát a törlés után
                setReviews(reviews.filter(review => review._id !== reviewId));
            })
            .catch(error => console.error('Error deleting review:', error));
    };

    return (
        <div className={`${styles.Komponens}`}>
            <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>

                <NavigationForAdmin />
                <div className={`${styles.content}`}>
                    <h1>Értékelések kezelése✅❌</h1>
                    <div className="table-responsive">
                    {reviews.length > 0 ? (

                        <table className={`table table-striped table-hover ${styles.reviewtable}`}>
                            <thead>
                                <tr>
                                    <th>Edzőterem</th>
                                    <th>Felhasználó</th>
                                    <th>Értékelés</th>
                                    <th>Megjegyzés</th>
                                    <th>Törlés</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.sort((a, b) => a.rating - b.rating) // Növekvő sorrendbe redezzük
                                .map((review) => (
                                    <tr key={review._id}>
                                        <td>{review.gymName}</td>
                                        <td>{review.userName}</td>
                                        <td>{review.rating}</td>
                                        <td>{review.comment}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(review._id)}
                                                >
                                                Törlés
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Nincsenek meglévő értékelések.</p>
                    )}
                    </div>
                </div>
            </div>
            </div>
        );
}

export default ManageReviews;
