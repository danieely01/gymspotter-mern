import React from 'react';
import styles from "./CSS/Contact.module.css"; // Moduloknál változót kell használni
import NavigationForUsers from './NavigationForUsers';


export default function Contact() {
  return (
    <div className={`${styles.Komponens}`}>
      <div>
            <NavigationForUsers/>
        <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
              <h1>Kapcsolat</h1>
              <ol>
                <li>terem1 </li>
                <li>terem2 </li>
                <li>terem3 </li>
              </ol>
        </div>
      </div>
    </div>
  )
}
