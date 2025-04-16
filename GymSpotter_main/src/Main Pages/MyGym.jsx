import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./CSS/ServiceProvider.module.css";
import ServiceProvider from "./ServiceProvider";
import UserPage from "./UserPage";

function Valami() {
    alert("A gomb meg lett nyomva!");
}

export default function MyGym() {
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
            <div className={`mt-5 ml-5 form-group w-25`}>
                {/* Terem neve input */}
                <div className="form-group">
                    <label htmlFor="gymName">Terem neve:</label>
                    <input type="text" name="gymName" id="gymName" placeholder="Terem név" className="form-control"/>
                </div>

                {/* Email input */}
                <div className="form-group">                    
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" placeholder="email@email.com" className="form-control"/>
                </div>

                {/* Telefonszám input */}
                <div className="form-group">                  
                    <label htmlFor="phoneNumber">Telefonszám:</label>
                    {/* Későbbiekben chekkolni, hogy jó formátumban írta-e be a felhasználó a telefonszámot!!! lásd placeholder! */}
                    <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="06301111111" pattern="[0-9]{2}[0-9]{2}[0-9]{3}[0-9]{4}" required className="form-control"/>
                </div>

                {/* Irányítószám input*/}
                <div className="form-group">                    
                    <label htmlFor="postalCode">Irányítószám</label>
                    <input type="number" id="postalCode" name="postalCode" placeholder="1243" pattern="[0-9]{5}" className="form-control"/>
                </div>

                {/* Város input*/}
                <div className="form-group">                    
                    <label htmlFor="city">Város</label>
                    <input type="text" id="city" name="city" placeholder="Budapest XIII" className="form-control"/>
                </div>

                {/* Utca, házszám input*/}
                <div className="form-group">                     
                     <label htmlFor="strettAndNumber">Utca, házszám</label>
                    <input type="text" id="strettAndNumber" name="strettAndNumber" placeholder="Kiss Ferenc utca 11/A" className="form-control"/>
                </div>

                {/* Sortörés */}
                <br />

                {/* Mentés gomb
                Onclick eseményre hozzáadjuk az adatokat az adatbázishoz */}
                <button type="submit" onClick={Valami} className="btn btn-primary">Mentés</button>


            </div>                    
        </div>
    </div>    
  )
}
