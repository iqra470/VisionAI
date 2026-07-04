import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminChart({ users }) {

  const data = {
    labels: users.map(user => user.name),

    datasets: [
      {
        label: "Images Generated",

        data: users.map(
          user => user.totalImages || 0
        ),
      }
    ]
  };

  return (

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">

        Images Generated Per User

      </h2>

      <Bar data={data} />

    </div>

  );

}

export default AdminChart;