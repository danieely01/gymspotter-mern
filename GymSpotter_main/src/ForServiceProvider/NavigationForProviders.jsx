import  {useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CSS/NavigationForProviders.module.css";
import { AuthContext } from "../context/auth-context";
export default function NavigationForProviders() {
  const location = useLocation(); 
  const auth = useContext(AuthContext); //Újra rendereli az oldalt, ha ez változik
  return (
    <nav className={`navbar navbar-expand-md navbar-dark fw-bold fixed-top ${styles.Komponens}`}>
      <Link className={`navbar-brand ${styles.navbarlogo}`} to="/serviceprovider">GymSpotter</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>


      <div className={`collapse navbar-collapse ${styles.navbarContainer}`} id="navbarText">
        <ul className="navbar-nav mx-auto justify-content-center">
        {/* EDZŐTERMEM FÜL */}
        {auth.isLoggedIn && (<li className={`nav-item ${location.pathname === "/serviceprovider/edzotermem" ? styles.active : ""}`}>
            <Link className={`${styles.navlink} nav-link`} to="/serviceprovider/edzotermem">Edzőtermem</Link>
          </li>)}  
          
        {/* EDZŐTERMEM ÁTTEKINTÉSE FÜL */}
          {auth.isLoggedIn && (<li className={`nav-item ${location.pathname === "/:providerid/ertekelesek_attekintese" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/:providerid/ertekelesek_attekintese">Értékelések áttekintése</Link>
            </li>)}

            {/* KAPCSOLAT FÜL        */}
          {auth.isLoggedIn && (<li className={`nav-item ${location.pathname === "/serviceprovider/kapcsolat" ? styles.active : ""}`}>
            <Link className={`${styles.navlink} nav-link`} to="/serviceprovider/kapcsolat">Kapcsolat</Link>
            </li>)}

            {/* KIJELENTKEZÉS */}
             {auth.isLoggedIn && (
                        <li className={`nav-item`}>
                             <Link 
              className={`${styles.navlink} nav-link`} 
              to="/loginpage" 
              onClick={(e) => {
                e.preventDefault(); // Megakadályozza az azonnali átváltást
                auth.logout();
              }}
            >
              Kijelentkezés
            </Link>
                      
                      </li>)}
            
        </ul>
      </div>
    </nav>
  );
}
