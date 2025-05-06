import { useEffect, useState } from "react";
import NavigationForAdmin from "./NavigationForAdmin";
import styles from "./CSS/ManageGyms.module.css";

function ManageGyms() {
  const [gyms, setGyms] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;


  // Fetching all gyms
  useEffect(() => {
    fetch(`${apiUrl}/admin/osszes_edzoterem`)
      .then((res) => res.json())
      .then((data) => setGyms(data))
      .catch((err) => console.error("Error fetching gyms:", err));
  }, []);

  // Deleting a gym
  const handleDelete = (id) => {
    fetch(`${apiUrl}/admin/edzoterem_torles/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error during deletion");
        return res.text();
      })
      .then(() => setGyms(gyms.filter((gym) => gym._id !== id))) // Update the list after deletion
      .catch((err) => console.error(err));
  };

  // Updating the status of the gym
  const handleStatusChange = (id, status) => {
    fetch(`${apiUrl}/admin/konditermek_kezelese/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error updating status");
        }
        return res.text();
      })
      .then(() => {
        setGyms(gyms.filter((gym) => gym._id !== id)); // Remove the deleted gym
      })
      .catch((err) => console.error(err));
  };

  // Filtering pending and approved gyms
  const pendingGyms = gyms.filter((gym) => gym.status === 'pending');
  const otherGyms = gyms.filter((gym) => gym.status !== 'pending');

  return (
    <div className={`${styles.Komponens}`}>
    <div className={`container p-3 ${styles.content}`}>
      <NavigationForAdmin />
      <h1 className="text-center mb-4">Konditermek kezelése🏋️‍♀️</h1>
  
      <div className="table-responsive">
      {gyms.length > 0 ? (
        <table className={`table table-striped table-hover ${styles.gymstable}`}>
          <thead>
            <tr>
              <th scope="col">Konditerem</th>
              <th scope="col">Helyszín</th>
              <th scope="col">Szolgáltatások</th>
              
              <th scope="col">Ár</th>
              <th scope="col">Státusz</th>
              <th scope="col">Művelet</th>
            </tr>
          </thead>
          <tbody>
            {/* Sort gyms by status: pending first */}
            {gyms.filter((gym) => gym.status !== 'declined') // Elutasított konditermeket ne listázzuk
            .sort((a, b) => (a.status === 'pending' ? -1 : 1)).map((gym) => (
              <tr key={gym._id}>
                <td>{gym.gymName}</td>
                <td>{gym.location}</td>
                <td>{gym.services.join(", ")}</td>
                
                <td>{gym.price} HUF</td>
                <td className={gym.status === 'pending' ? 'status-pending' : gym.status === 'approved' ? 'status-approved' : 'status-declined'}>
                  {gym.status}
                </td>
                <td>
                  
  <div className={`${styles.buttonContainer}`}>
    {gym.status === 'pending' ? (
      <>
        <button onClick={() => handleStatusChange(gym._id, "approved")} className="btn btn-success">
          Elfogadás
        </button>
        <button onClick={() => handleStatusChange(gym._id, "declined")} className="btn btn-danger">
          Elutasítás
        </button>
      </>
    ) : (
      <button onClick={() => handleDelete(gym._id)} className="btn btn-danger">
        Törlés
      </button>
    )}
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : (
          <p>Nincsenek feltöltött, illetve jóváhagyásra váró konditermek.</p>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default ManageGyms;
