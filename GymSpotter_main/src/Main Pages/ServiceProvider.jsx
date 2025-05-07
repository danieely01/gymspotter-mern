import styles from "./CSS/ServiceProvider.module.css";
import NavigationForProviders from "../ForServiceProvider/NavigationForProviders";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";

export default function ServiceProvider() {
  const { isLoggedIn, userName } = useContext(AuthContext); 
    
    useEffect(() => {
        console.log("ServiceProvider frissítése, userName:", userName); // Ellenőrzéshez
    }, [userName]); // Ha változik, újra rendereli az oldaltttt

    console.log("ServiceProvider context:", { isLoggedIn, userName }); // Ellenőrzéshez

 
  return (
    <div className={`${styles.Komponens}`}>
        {/* Navigációs sáv */}
        <NavigationForProviders/>
        {/* Tartalom */}
         <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
                {isLoggedIn ? (
                  <h1 className={`${styles.cim}`}>🎉Üdvözöllek a szolgáltató főoldalán, kedves {userName}!🎉</h1> //bejjelentkezettek
                ) : (
                  <h1 className={`${styles.cim}`}>🎉Üdvözöllek a GymSpotter főoldalán!🎉</h1> //nem bejeltnekzetekl
                )}
               <p className={`${styles.szoveg}`}>Ha bármivel kapcsolatban probléma merülne fel kérjük vegye fel velünk a kapcsolatot!</p>
              
              </div>
              
    </div>    
  )
}
