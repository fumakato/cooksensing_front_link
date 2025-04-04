//円グラフ

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph: React.FC = () => {
  const data = {
    labels: ["冷蔵庫", "まな板", "流し台", "コンロ", "休憩スペース"],
    datasets: [
      {
        label: "# of Votes",
        data: [50, 400, 250, 220, 100],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const options = {
    //maintainAspectRatio: false,
    responsive: false,
  };

  return (
    <>
      <Pie data={data} options={options} width={500} height={500} />;
    </>
  );
};

export default Graph;
