import React from 'react';
import styles from "./CSS/Favourites.module.css"; // Moduloknál változót kell használni
import NavigationForUsers from './NavigationForUsers';



export default function Favourites() {
  return (
    <div className={`${styles.Komponens}`}>
          <NavigationForUsers/>
          <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
                        <h1>Kedvenceim</h1>
                        <ol>
                          <li>terem1 </li>
                          <li>terem2 </li>
                          <li>terem3 </li>
                        </ol>
                  </div>
        </div>
  )
}
