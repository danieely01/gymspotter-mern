import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CSS/AdminPage.module.css";
import NavigationForAdmin from "../AdminPages/NavigationForAdmin"



export default function AdminPage() {
  const location = useLocation(); 
  return (
   
     <div className={`${styles.Komponens}`}>
          <NavigationForAdmin/>
              
              <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content} `}>
                          <h1 className={`${styles.cim}`}>Üdvözlünk az Admin Felületen! 🐱‍💻</h1>
                          <p className={`${styles.szoveg}`}>Ez a GymSpotter adminisztrációs felülete, ahol teljes körű hozzáférést kapsz a rendszer kezeléséhez. Itt lehetőséged van a felhasználók, edzőtermek és értékelések kezelésére, valamint statisztikák megtekintésére.</p>
                        
                      </div>
              </div>

    

    
  )
}
