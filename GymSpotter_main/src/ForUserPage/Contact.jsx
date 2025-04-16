import React from 'react';
import styles from "./CSS/Contact.module.css"; // Moduloknál változót kell használni
import NavigationForUsers from './NavigationForUsers';


export default function Contact() {
  return (
    <div className={`${styles.Komponens}`}>
    <div>
      <NavigationForUsers />
      <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
        <h1 className={`${styles.cim} text-center mb-4`}>Kapcsolat ☎</h1>
        <p className="text-center mb-4">
          Ha kérdése van, vagy segítségre van szüksége, kérjük, vegye fel velünk a kapcsolatot az alábbi módokon:
        </p>
  
        {/* Kapcsolatfelvételi információk */}
        <div className="row justify-content-between">
          {/* Email szekció */}
          <div className="col-md-5 mb-4">
            <div className="d-flex align-items-center p-4 bg-light rounded shadow-sm h-100">
              <div className="me-4">
                <i className="fas fa-envelope fa-3x text-primary"></i>
              </div>
              <div className={`${styles.kartyak}`}>
                <h5>📭 Email</h5>
                <p className="mb-1"><strong>Adminisztrátor:</strong> admin@weboldal.hu</p>
                <p className="mb-1"><strong>Szolgáltatói támogatás:</strong> szolgaltato@weboldal.hu</p>
                <p><strong>Ügyfélszolgálat:</strong> ugyfelszolgalat@weboldal.hu</p>
              </div>
            </div>
          </div>
  
          {/* Telefon szekció */}
          <div className="col-md-5 mb-4">
            <div className="d-flex align-items-center p-4 bg-light rounded shadow-sm h-100">
              <div className="me-4">
                <i className="fas fa-phone-alt fa-3x text-success"></i>
              </div>
              <div className={`${styles.kartyak}`}>
                <h5>📞 Telefon</h5>
                <p><strong>Kapcsolat telefonon:</strong> +36 30 123 4567</p>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </div>
  
  )
}
