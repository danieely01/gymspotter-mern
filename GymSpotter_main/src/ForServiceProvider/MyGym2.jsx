import React from 'react';
import styles from "./CSS/MyGym2.module.css";
import NavigationForProviders from './NavigationForProviders.jsx';

export default function MyGym2() {
  return (
    <div className={styles.Komponens}>
      <NavigationForProviders />
      <div className={styles.formContainer}>
        <form className={styles.form} action='http://localhost:3000/serviceprovider/edzotermem' method='POST'>
          <h2 className={styles.formTitle}>Edzőterem hozzáadása</h2>

          <div className={styles.inputGroup}>
            <label htmlFor="gymName">Terem neve</label>
            <input type="text" name="gymName" id="gymName" placeholder="Terem név" className={styles.input} required />
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
            <input type="text" id="postalCode" name="postalCode" placeholder="1243" pattern="[0-9]{4}" className={styles.input} required />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="city">Város</label>
            <input type="text" id="city" name="city" placeholder="Budapest XIII" className={styles.input} required />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="streetAndNumber">Utca, házszám</label>
            <input type="text" id="streetAndNumber" name="streetAndNumber" placeholder="Kiss Ferenc utca 11/A" className={styles.input} required />
          </div>
          
          <button type="submit" className={styles.submitButton}>Hozzáadás</button>
        </form>
      </div>
    </div>
  );
}
