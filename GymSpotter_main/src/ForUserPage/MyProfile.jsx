import React from 'react';
import styles from "./CSS/MyProfile.module.css"; // Moduloknál változót kell használni
import NavigationForUsers from './NavigationForUsers';


export default function MyProfile() {
  return (
    <div className={`${styles.Komponens}`}>
      <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
            <NavigationForUsers/>
            <div className={`${styles.content}`}>
                          <h1>Profilom</h1>
                          
                    </div>
          </div>
      
    </div>
  )
}
