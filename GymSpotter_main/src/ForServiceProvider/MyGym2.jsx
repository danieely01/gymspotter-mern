import React, { useState, useContext, useEffect } from 'react';
import styles from "./CSS/MyGym2.module.css";
import NavigationForProviders from './NavigationForProviders.jsx';
import { AuthContext } from "../context/auth-context";

export default function MyGym2() {
  const { userId } = useContext(AuthContext); // userId lekérése a contextből
  const [canAddGym, setCanAddGym] = useState(true); // Kezdetben feltételezzük, hogy hozzáadhat edzőtermet
  const [error, setError] = useState(null); // Hibakezelés
  const [formSubmitted, setFormSubmitted] = useState(false); // Form beküldése állapot

  // Ellenőrizzük, hogy a felhasználónak van-e már edzőterme
  useEffect(() => {
    fetch(`http://localhost:3000/${userId}/check-gym`)
      .then(response => response.json())
      .then(data => {
        setCanAddGym(data.canAddGym); // Ha nem tud új edzőtermet hozzáadni, akkor letiltjuk a formot
      })
      .catch(error => {
        console.error('Hiba történt az ellenőrzés során:', error);
      });
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const postalCode = formData.get('postalCode');
    const city = formData.get('city');
    const street = formData.get('street');
    const location = `${postalCode} ${city}, ${street}`;



    const gymData = {
      name: formData.get('gymName'),
      services: formData.get('services'),
      price: formData.get('price'),
      email: formData.get('email'),
      phoneNumber: formData.get('phoneNumber'),
      location: location,
    };

    try {
      const response = await fetch(`http://localhost:3000/${userId}/edzotermem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gymData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Hiba történt az edzőterem hozzáadása közben');
      }

      const result = await response.json();
      alert('Edzőterem sikeresen hozzáadva: ' + result.name);
      // Beállítjuk a formSubmitted állapotot, hogy elrejtsük a formot
      setFormSubmitted(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.Komponens}>
      <NavigationForProviders />
      <div className={styles.formContainer}>
        {formSubmitted ? (
          <p className={styles.NoGym}>Már van edzőtermed, amely jóváhagyásra vár vagy már jóváhagyásra került.</p>
        ) : (
          canAddGym ? (
            <>
              {error && <div className={styles.error}>{error}</div>} {/* Hibák megjelenítése */}
              <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Már van edzőtermed, amely jóváhagyásra vár vagy már jóváhagyásra került.</h2>

                <div className={styles.inputGroup}>
                  <label htmlFor="gymName">Terem neve</label>
                  <input type="text" name="gymName" id="gymName" placeholder="Terem név" className={styles.input} required />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="services">Szolgáltatások (vesszővel elválasztva)</label>
                  <input type="text" id="services" name="services" placeholder="HIIT, Jóga, MMA" className={styles.input} />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="price">Ár</label>
                  <input type="number" id="price" name="price" placeholder="5000" className={styles.input} required />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" placeholder="email@email.com" className={styles.input} required />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="phoneNumber">Telefonszám</label>
                  <input type="text" id="phoneNumber" name="phoneNumber" placeholder="06301111111" pattern="[0-9]{2}[0-9]{2}[0-9]{3}[0-9]{4}" required className={styles.input} />
                </div>

              
                <div className={styles.inputGroup}>
                  <label htmlFor="postalCode">Irányítószám</label>
                  <input 
                    type="text" 
                    id="postalCode" 
                    name="postalCode" 
                    placeholder="1181" 
                    pattern="^[0-9]{4}$" 
                    required 
                    className={styles.input} 
                    title="4 számjegyű irányítószám"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="city">Város</label>
                  <input 
                    type="text" 
                    id="city" 
                    name="city" 
                    placeholder="Budapest" 
                    pattern="^[A-Za-záéíóöőúüű]+(?:[ -][A-Za-záéíóöőúüű]+)*$" 
                    required 
                    className={styles.input} 
                    title="Csak betűk és szóközök engedélyezettek"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="street">Utca és házszám</label>
                  <input 
                    type="text" 
                    id="street" 
                    name="street" 
                    placeholder="Csontváry utca 63" 
                    pattern="^[A-Za-záéíóöőúüű]+(?:[ -][A-Za-záéíóöőúüű]+)*\s[0-9]+$" 
                    required 
                    className={styles.input} 
                    title="Az utca neve és házszáma, pl. Csontváry utca 63"
                  />
                </div>

                
                <button type="submit" className={styles.submitButton}>Hozzáadás</button>
              </form>
            </>
          ) : (
            <p className={styles.NoGym}>Már van edzőtermed, amely jóváhagyásra vár vagy már jóváhagyásra került.</p>
          )
        )}
      </div>
    </div>
  );
}
