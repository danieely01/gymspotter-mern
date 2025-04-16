import React from "react";
import styles from "./CSS/ContactForServiceProvider.module.css"; // Moduloknál változót kell használni


import NavigationForProviders from "./NavigationForProviders";


export default function ContactForServiceProvider() {
  
  return (
    <div className={`${styles.Komponens}`}>
        {/* Navigációs sáv */}
        <NavigationForProviders/>

        {/* Tartalom */}
        <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
            <div>
               <h1 className={`${styles.cim}  text-center mb-4`}>Elérhetőségek listázása</h1>
               
            </div>                    
        </div>
    </div>    
  )
}
