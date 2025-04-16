import styles from "./CSS/RegisterPage.module.css"; // Moduloknál változót kell használni
import NavigationForUsers from "../ForUserPage/NavigationForUsers";

const RegisterPage = () => {
    return <div className={`${styles.Komponens}`}>
    <NavigationForUsers/>
    <div className={`container d-flex justify-content-center align-items-center min-vh-100`}>
        <div className="p-4 shadow-lg rounded bg-white">
        <form>
            <h2>Regisztráció</h2>
          <div id="inputMezok">
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                id="felhasznalonev"
                placeholder="Felhasználóneved"
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                id="jelszo"
                className="form-control"
                placeholder="Jelszó"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="E-mail"
              />
            </div>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-dark" type="submit">
              Regisztrálok
            </button>
            
          </div>
        </form>
        
      </div>


    </div>
    </div>
}

export default RegisterPage
