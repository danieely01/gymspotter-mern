import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CSS/NavigationForUsers.module.css";

export default function NavigationForUsers() {
  const location = useLocation(); 

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
          <li className={`nav-item ${location.pathname === "/kedvencek" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/kedvencek">Kedvencek</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/kapcsolat" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/kapcsolat">Kapcsolat</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/ertekeleseim" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/ertekeleseim">Értékeléseim</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/profilom" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/profilom">Profilom</Link>
          </li>
          <li className={`nav-item ${location.pathname === "/loginpage" ? styles.active : ""}`}>

            <Link className={`${styles.navlink} nav-link`} to="/loginpage">Bejelentkezés</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
