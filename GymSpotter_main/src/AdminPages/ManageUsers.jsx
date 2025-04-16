import NavigationForAdmin from "./NavigationForAdmin";
import styles from "./CSS/ManageUsers.module.css";
import { useEffect, useState } from "react";

function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/felhasznalok_kezelese")
            .then(response => response.json())
            .then(data => setUsers(data.filter(user => user.type !== 'admin')))
            .catch(error => console.error("Hiba a felhasználók lekérdezése során:", error));
    }, []);

    const deleteUser = (userId) => {
        fetch(`http://localhost:3000/admin/felhasznalo_torles/${userId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setUsers(users.filter(user => user._id !== userId));
                    alert("Felhasználó sikeresen törölve!");
                } else {
                    alert("Hiba történt a törlés során.");
                }
            })
            .catch(error => console.error("Hiba a felhasználó törlése során:", error));
    };

    return (
        <div className={`${styles.Komponens}`}>
            <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
                <NavigationForAdmin />
                <h1>Felhasználók kezelése</h1>
                <div className="table-responsive">
                {users.length > 0 ? (
                    <table className={`table table-striped table-hover ${styles.userstable}`}>
                        <thead>
                            <tr>
                                <th>Felhasználónév</th>
                                <th>Email</th>
                                <th>Típus</th>
                                <th>Műveletek</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.type}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Törlés</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                        <p>Nincsenek regisztrált felhasználók.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;