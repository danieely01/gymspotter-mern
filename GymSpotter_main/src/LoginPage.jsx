import styles from "./CSS/LoginPage.module.css"; // Moduloknál változót kell használni
import { useNavigate } from 'react-router-dom';

function LoginPage() {

  const navigate = useNavigate();

  const GoToRegisterPage = () => {
      navigate('/registerpage');
  };




  return (
    <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${styles.Komponens}`}>
      <div className="p-4 shadow-lg rounded bg-white">
        <form>
          <div id="inputMezok">
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                id="felhasznalonev"
                placeholder="Felhasználónév"
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
          </div>

          <div className="text-end">
            <a href="/elfelejtettjelszo" className="text-decoration-none">
              Elfelejtett jelszó?
            </a>
          </div>

          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-dark" type="submit">
              Bejelentkezés
            </button>
          </div>
        </form>
            <div className="d-grid gap-2 mt-3">
            <button className="btn btn-success" onClick={GoToRegisterPage}>Regisztráció</button>
            </div>
      </div>
    </div>
  );
}

export default LoginPage;
