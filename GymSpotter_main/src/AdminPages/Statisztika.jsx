import NavigationForAdmin from "./NavigationForAdmin"
import styles from "./CSS/Statisztika.module.css"; // Moduloknál változót kell használni


function Statisztika() {
     return (
        <div className={`${styles.Komponens}`}>
          <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
                <NavigationForAdmin/>
                <div className={`${styles.content}`}>
                              <h1>Profilom</h1>
                              
                        </div>
              </div>
          
        </div>
      )
}

export default Statisztika
