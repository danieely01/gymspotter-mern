import React, { useEffect, useState } from 'react';
import styles from "../ForUserPage/CSS/NavigationForProviders.module.css";
import NavigationForProviders from './NavigationForProviders.jsx';

export default function MyGym2() {



  return (
    <div className={`${styles.Komponens}`}>
            <NavigationForProviders/>
    
            {/* Tartalom */}
            <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
                <div className={`mt-5 ml-5 form-group w-25`}>
                    <form className='form' action='http://localhost:3000/serviceprovider/edzotermem' method='POST'>
                      {/* Terem neve input */}
                    <div className="form-group">
                        <label htmlFor="gymName">Terem neve:</label>
                        <input type="text"  name="gymName" id="gymName" placeholder="Terem név" className="form-control"/>
                    </div>
    
                    {/* Email input */}
                    <div className="form-group">                    
                        <label htmlFor="email">Email:</label>
                        <input type="email"  name="email" id="email" placeholder="email@email.com" className="form-control"/>
                    </div>
    
                    {/* Telefonszám input */}
                    <div className="form-group">                  
                        <label htmlFor="phoneNumber">Telefonszám:</label>
                        {/* Későbbiekben chekkolni, hogy jó formátumban írta-e be a felhasználó a telefonszámot!!! lásd placeholder! */}
                        <input type="text"  id="phoneNumber" name="phoneNumber" placeholder="06301111111" pattern="[0-9]{2}[0-9]{2}[0-9]{3}[0-9]{4}" required className="form-control"/>
                    </div>
    
                    {/* Irányítószám input*/}
                    <div className="form-group">                    
                        <label htmlFor="postalCode">Irányítószám</label>
                        <input type="text"  id="postalCode" name="postalCode" placeholder="1243" pattern="[0-9]{4}" className="form-control"/>
                    </div>
    
                    {/* Város input*/}
                    <div className="form-group">                    
                        <label htmlFor="city">Város</label>
                        <input type="text"  id="city" name="city" placeholder="Budapest XIII" className="form-control"/>
                    </div>
    
                    {/* Utca, házszám input*/}
                    <div className="form-group">                     
                         <label htmlFor="streetAndNumber">Utca, házszám</label>
                        <input type="text"  id="streetAndNumber" name="streetAndNumber" placeholder="Kiss Ferenc utca 11/A" className="form-control"/>
                    </div>
    
                    {/* Sortörés */}
                    <br />
    
                    {/* Mentés gomb
                    Onclick eseményre hozzáadjuk az adatokat az adatbázishoz */}
                    <button type="submit"  className="btn btn-primary">Hozzáadás</button>
                    </form>
    
    
                </div>                    
            </div>
        </div>    
  
  );
}
