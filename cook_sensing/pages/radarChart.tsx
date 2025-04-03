import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data = {
  labels: [
    "効率",
    "力の強さ",
    "切るはやさの速さ",
    "Thing 4",
    "Thing 5",
    "Thing 6",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [7, 8, 4, 5, 6, 3],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: false,
};

export function App() {
  return <Radar data={data} options={options} width={500} height={500} />;
}

export default App;
