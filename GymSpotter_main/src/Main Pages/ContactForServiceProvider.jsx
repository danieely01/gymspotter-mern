import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CSS/ServiceProvider.module.css";


export default function ContactForServiceProvider() {
  const location = useLocation(); 
  return (
    <div className={`${styles.Komponens}`}>
        {/* Navigációs sáv */}
        <nav className={`navbar navbar-expand-md navbar-dark fw-bold fixed-top ${styles.Navbar}`}>
            <Link className={`navbar-brand ${styles.navbarlogo}`} to="/serviceprovider">GymSpotter</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${styles.navbarContainer}`} id="navbarText">

                {/* Számozatlan lista */}
                <ul className="navbar-nav mx-auto justify-content-center">

                    {/* Edzőterem fül */}
                    <li className={`nav-item ${location.pathname === "/serviceprovider/felhasznalok_kezelese" ? styles.active : ""}`}>
                        <Link className={`${styles.navlink} nav-link`} to="/serviceprovider/edzotermem">Edzőtermem</Link>
                    </li>

                    {/* Értékelések áttekintése fül */}
                    <li className={`nav-item ${location.pathname === "/serviceprovider/edzotermek_kezelese" ? styles.active : ""}`}>
                        <Link className={`${styles.navlink} nav-link`} to="/serviceprovider/ertekelesek_attekintese">Értékelések áttekintése</Link>
                    </li>

                    {/* Kapcsolat fül */}
                    <li className={`nav-item ${location.pathname === "/serviceprovider/ertekelesek_kezelese" ? styles.active : ""}`}>
                        <Link className={`${styles.navlink} nav-link`} to="/serviceprovider/kapcsolat">Kapcsolat</Link>
                    </li>          
                </ul>                                               
            </div>

            {/* Kijelentkezés gomb */}
            <Link className={`navbar-brand ${styles.navbarlogo}`} to="/serviceprovider">LogOut</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> 
        </nav>

        {/* Tartalom */}
        <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
            <div className={`mt-5 ml-5`}>
               <h1>Elérhetőségek listázása!</h1>
               <img src="/dumbbell.png" alt="Kézi súlyzó png" />
            </div>                    
        </div>
    </div>    
  )
}
