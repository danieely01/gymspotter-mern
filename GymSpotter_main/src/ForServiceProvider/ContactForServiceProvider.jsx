import React from "react";
import styles from "./CSS/NavigationForProviders.module.css";

import NavigationForProviders from "./NavigationForProviders";


export default function ContactForServiceProvider() {
  
  return (
    <div className={`${styles.Komponens}`}>
        {/* Navigációs sáv */}
        <NavigationForProviders/>

        {/* Tartalom */}
        <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
            <div className={`mt-5 ml-5`}>
               <h1>Elérhetőségek listázása!</h1>
               <img src="/dumbbell.png" alt="Kézi súlyzó png" />
            </div>                    
        </div>
    </div>    
  )
}
