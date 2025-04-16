import styles from "./CSS/UserPage.module.css"; // Moduloknál változót kell használni



function UserPage() {

    return (
       <div className={`container justify-content-center align-items-center min-vh-100 ${styles.Komponens}`}>
                <nav className="navbar navbar-expand-lg navbar-dar ">
                        <a className="navbar-brand" href="#">GymSpotter</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Edzőtermek</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Kedvencek</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Kapcsolat</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Értékeléseim</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Profilom</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link" href="#">Kilépés</a>
                            </li>

                            </ul>
                            
                        </div>
                </nav>
       </div>
    )
}

export default UserPage
