import React, {useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../ForUserPage/CSS/NavigationForUsers.module.css";
import { AuthContext } from "../context/auth-context";
export default function NavigationForUsers() {
  const location = useLocation(); 
  const auth = useContext(AuthContext); //Újra rendereli az oldalt, ha ez változik
  return (
    <nav className={`navbar navbar-expand-md navbar-dark fw-bold fixed-top ${styles.Komponens}`}>
      <Link className={`navbar-brand ${styles.navbarlogo}`} to="/admin">GymSpotter</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${styles.navbarContainer}`} id="navbarText">
        <ul className="navbar-nav mx-auto justify-content-center">
        <li className={`nav-item ${location.pathname === "/admin/felhasznalok_kezelese" ? styles.active : ""}`}>
            <Link className={`${styles.navlink} nav-link`} to="/admin/felhasznalok_kezelese">Felhasználók kezelése</Link>
          </li>
          {/* Csak bejelentkezett felhasználók látják a kedvencek fület */}
          
              <li className={`nav-item ${location.pathname === "/admin/konditermek_kezelese" ? styles.active : ""}`}>

              <Link className={`${styles.navlink} nav-link`} to="/admin/konditermek_kezelese">Konditermek kezelése</Link>
            </li>
          
          <li className={`nav-item ${location.pathname === "/admin/ertekelesek_kezelese" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/admin/ertekelesek_kezelese">Értékelések kezelése</Link>
          </li>
          {/* Csak bejelentkezett felhasználók látják a értékeléseim fület */}

          <li className={`nav-item ${location.pathname === "/admin/statisztika" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/admin/statisztika">Statisztika</Link>
            </li>
         
            {/* Csak a be nem jelentkezett felhasználóknak írja ki, hogy bejelentkezés */}
            {auth.isLoggedIn && (
            <li className={`nav-item ${location.pathname === "/loginpage" ? styles.active : ""}`}>
              <button onClick={auth.logout} className={`${styles.navlink} nav-link`} style={{ background: "none", border: "none", padding: 0 }}>Kijelentkezés</button>
          
          </li>)}
        </ul>
      </div>
    </nav>
  );
}
