import React, {useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CSS/NavigationForUsers.module.css";
import { AuthContext } from "../context/auth-context";
export default function NavigationForUsers() {
  const location = useLocation(); 
  const auth = useContext(AuthContext); //Újra rendereli az oldalt, ha ez változik
  return (
    <nav className={`navbar navbar-expand-md navbar-dark fw-bold fixed-top ${styles.Komponens}`}>
      <Link className={`navbar-brand ${styles.navbarlogo}`} to="/userpage">GymSpotter</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${styles.navbarContainer}`} id="navbarText">
        <ul className="navbar-nav mx-auto justify-content-center">
        <li className={`nav-item ${location.pathname === "/edzotermek" ? styles.active : ""}`}>
            <Link className={`${styles.navlink} nav-link`} to="/edzotermek">Edzőtermek</Link>
          </li>
          {/* Csak bejelentkezett felhasználók látják a kedvencek fület */}
          {auth.isLoggedIn && (
              <li className={`nav-item ${location.pathname === "/kedvencek" ? styles.active : ""}`}>

              <Link className={`${styles.navlink} nav-link`} to="/kedvencek">Kedvencek</Link>
            </li>
          )} 
          <li className={`nav-item ${location.pathname === "/kapcsolat" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/kapcsolat">Kapcsolat</Link>
          </li>
          {/* Csak bejelentkezett felhasználók látják a értékeléseim fület */}

          {auth.isLoggedIn && (<li className={`nav-item ${location.pathname === "/ertekeleseim" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/ertekeleseim">Értékeléseim</Link>
            </li>)}
            {/* Csak bejelentkezett felhasználók látják a profilom fület */}
          {auth.isLoggedIn && ( <li className={`nav-item ${location.pathname === "/profilom" ? styles.active : ""}`}>

              <Link className={`${styles.navlink} nav-link`} to="/profilom">Profilom</Link>
              </li>)}
          {/* Csak a be nem jelentkezett felhasználóknak írja ki, hogy bejelentkezés */}
          {!auth.isLoggedIn && (<li className={`nav-item ${location.pathname === "/loginpage" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/loginpage">Bejelentkezés</Link>
            </li>)}
            {/* Csak a be nem jelentkezett felhasználóknak írja ki, hogy bejelentkezés */}
          {auth.isLoggedIn && (
            <li className={`nav-item ${location.pathname === "/logout" ? styles.active : ""}`}>
            <Link 
              className={`${styles.navlink} nav-link`} 
              to="/loginpage" 
              onClick={auth.logout}
            >
              Kijelentkezés
            </Link>
          </li>)}
        </ul>
      </div>
    </nav>
  );
}
