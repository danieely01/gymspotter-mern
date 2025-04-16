import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CSS/AdminPage.module.css";


export default function AdminPage() {
  const location = useLocation(); 
  return (
    <div className={`${styles.Komponens}`}>
    <nav className={`navbar navbar-expand-md navbar-dark fw-bold fixed-top ${styles.Navbar}`}>
      <Link className={`navbar-brand ${styles.navbarlogo}`} to="/admin">GymSpotter ADMIN</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${styles.navbarContainer}`} id="navbarText">
        <ul className="navbar-nav mx-auto justify-content-center">
        <li className={`nav-item ${location.pathname === "/admin/felhasznalok_kezelese" ? styles.active : ""}`}>
            <Link className={`${styles.navlink} nav-link`} to="/admin/felhasznalok_kezelese">Felhasználók kezelése</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/admin/edzotermek_kezelese" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/admin/edzotermek_kezelese">Edzőtermek kezelése</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/admin/ertekelesek_kezelese" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/admin/ertekelesek_kezelese">Értékelések moderálása</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/admin/statisztika" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/admin/statisztika">Statisztika</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/">Kijelentkezés</Link>
          </li>
          
        </ul>
      </div>
    </nav>

    <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
                        <h1>Edzőtermek</h1>
                        <ol>
                          <li>terem1 </li>
                          <li>terem2 </li>
                          <li>terem3 </li>
                        </ol>
                  
    </div>

    

    

    </div>
    
  )
}
