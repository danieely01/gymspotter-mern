import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CSS/AdminPage.module.css";
import NavigationForAdmin from "../AdminPages/NavigationForAdmin"



export default function AdminPage() {
  const location = useLocation(); 
  return (
   
     <div className={`${styles.Komponens}`}>
          <NavigationForAdmin/>
              
              <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
                          <h1 className={`${styles.cim}`}>Üdvözöllek a GymSpotter főoldalán!</h1>
                          <p className={`${styles.szoveg}`}>Ez egy átfogó platform, amely segít azoknak, akik edzőterembe szeretnének járni, de nem tudják, melyik lenne a számukra legmegfelelőbb. A weboldal lehetőséget kínál a felhasználóknak arra, hogy egy helyen áttekintsék a különböző konditermeket.</p>
                        <p className={`${styles.szoveg}`}>A bejelentkezett felhasználók elmenthetik kedvenc edzőtermeiket, írhatnak értékeléseket.</p>
                        
                      </div>
              </div>

    

    
  )
}
