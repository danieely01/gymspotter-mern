import styles from "./CSS/Home.module.css"; // Moduloknál változót kell használni

import { useNavigate } from 'react-router-dom';


function Home() {

    const navigate = useNavigate();

    const goToLoginPage = () => {
        navigate('/loginpage');
    };

    return (
        <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.Komponens}`}>
            <h1>Üdvözöllek a GymSpotter főoldalán!</h1>
            <p>Ez egy átfogó platform, amely segít azoknak, akik edzőterembe szeretnének járni, de nem tudják, melyik lenne a számukra legmegfelelőbb. A weboldal lehetőséget kínál a felhasználóknak arra, hogy egy helyen áttekintsék a különböző konditermeket.</p>

            <button onClick={goToLoginPage}>Tovább az edzőtermekhez</button>
        </div>
    )
}

export default Home
