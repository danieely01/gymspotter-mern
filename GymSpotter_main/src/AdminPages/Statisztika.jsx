import { useEffect, useState } from "react";
import NavigationForAdmin from "./NavigationForAdmin";
import styles from "./CSS/Statisztika.module.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Statisztika() {
  const [stats, setStats] = useState({ gyms: 0, users: 0 });

  useEffect(() => {
    fetch("http://localhost:3000/admin/statisztika")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Hiba a statisztika lekérésekor:", error));
  }, []);

  const chartData = {
    labels: ["Felhasználók", "Szolgáltatók"],
    datasets: [
      {
        data: [stats.users, stats.gyms],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className={`${styles.Komponens}`}>
      <div className={`container justify-content-center align-items-center p-3 min-vh-100 ${styles.content}`}>
        <NavigationForAdmin />
        <div className={`${styles.content}`}>
          <h1 className={`${styles.cim}`}>Statisztika</h1>
          <p><strong>Regisztrált felhasználók:</strong> {stats.users}</p>
          <p><strong>Regisztrált edzőtermek:</strong> {stats.gyms}</p>
          <div style={{ width: "300px", margin: "auto" }}>
            <Pie data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statisztika;
