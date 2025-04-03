// 複数のlegendを表示するプログラム
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          generateLabels: (chart: ChartJS) => {
            const originalLabels =
              ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            // Dataset 1 の色を変更
            originalLabels[0].fillStyle = "rgba(255, 159, 64, 0.6)"; // カスタム色
            originalLabels[0].strokeStyle = "rgba(255, 159, 64, 1)"; // カスタム色
            return originalLabels.concat([
              {
                text: "Legend 1",
                fillStyle: "rgba(75, 192, 192, 0.6)",
                strokeStyle: "rgba(75, 192, 192, 1)",
                hidden: false,
                index: 0,
              },
              {
                text: "Legend 2",
                fillStyle: "rgba(75, 192, 192, 0.6)",
                strokeStyle: "rgba(75, 192, 192, 1)",
                hidden: false,
                index: 0,
              },
            ]);
          },
        },
      },
      title: {
        display: true,
        text: "Bar Chart Example with Two Legends",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

const App = () => {
  return (
    <div>
      <h1>Bar Chart Example</h1>
      <BarChart />
    </div>
  );
};

export default App;
