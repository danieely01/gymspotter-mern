import styles from "./CSS/UserPage.module.css"; // Moduloknál változót kell használni
import NavigationForUsers from "../ForUserPage/NavigationForUsers";
import { useNavigate } from 'react-router-dom';



function UserPage() {
    const navigate = useNavigate();

    const goToPage = () => {
        navigate('/edzotermek');
    };

    return (
           <div className={`${styles.Komponens}`}>
           <NavigationForUsers/>
           <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
                       <h1 className={`${styles.cim}`}>🎉Üdvözöllek a GymSpotter főoldalán!🎉</h1>
                       <p className={`${styles.szoveg}`}>Ez egy átfogó platform, amely segít azoknak, akik edzőterembe szeretnének járni, de nem tudják, melyik lenne a számukra legmegfelelőbb. A weboldal lehetőséget kínál a felhasználóknak arra, hogy egy helyen áttekintsék a különböző konditermeket.</p>
                       <p className={`${styles.szoveg}`}>A bejelentkezett felhasználók elmenthetik kedvenc edzőtermeiket, írhatnak értékeléseket.</p>
                       <button onClick={goToPage} className={`${styles.gomb}`}>Tovább az edzőtermekhez</button>
                   </div>
           </div>
    )
}

export default UserPage
