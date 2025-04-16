import styles from "./CSS/ServiceProvider.module.css";
import NavigationForProviders from "../ForServiceProvider/NavigationForProviders";

export default function ServiceProvider() {
 
  return (
    <div className={`${styles.Komponens}`}>
        {/* Navigációs sáv */}
        <NavigationForProviders/>
        {/* Tartalom */}
        <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
            <div className={`mt-5 ml-5`}>
                <h1  className={`${styles.cim}`}>🎉Üdvözöllek a szolgáltató főoldalán!🎉</h1>
                <p className={`${styles.szoveg}`}>Ha bármivel kapcsolatban probléma merülne fel kérjük vegye fel velünk a kapcsolatot!</p>
                <img src="./dumbbell.png" alt="Kézi súlyzó png" />
            </div>                    
        </div>
    </div>    
  )
}
