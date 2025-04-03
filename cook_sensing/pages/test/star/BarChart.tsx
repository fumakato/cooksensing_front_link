import React, { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Plugin,
  Chart,
} from "chart.js";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";

// ChartJSに必要なコンポーネントを登録します
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  size: number;
}

// カスタムプラグインの定義
const createStarPlugin = (size: number): Plugin => {
  return {
    id: "starPlugin",
    beforeDraw: (chart: Chart) => {
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.save();
      ctx.fillStyle = "gold";
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - size);
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(
          centerX + size * Math.cos((18 + i * 72) * (Math.PI / 180)),
          centerY - size * Math.sin((18 + i * 72) * (Math.PI / 180))
        );
        ctx.lineTo(
          centerX + (size / 2) * Math.cos((54 + i * 72) * (Math.PI / 180)),
          centerY - (size / 2) * Math.sin((54 + i * 72) * (Math.PI / 180))
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },
  };
};

const BarChart: React.FC<BarChartProps> = ({ size }) => {
  const chartRef = useRef<ChartJSOrUndefined<"bar">>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      if (chart.config.plugins) {
        const pluginIndex = chart.config.plugins.findIndex(
          (plugin) => plugin.id === "starPlugin"
        );
        if (pluginIndex !== -1) {
          chart.config.plugins.splice(pluginIndex, 1); // 既存のプラグインを削除
        }
        chart.config.plugins.push(createStarPlugin(size)); // 新しいプラグインを追加
        chart.update(); // グラフを更新
      }
    }
  }, [size]);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Dataset 2",
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sample Bar Chart with Star Plugin",
      },
    },
  };

  return <Bar ref={chartRef} data={data} options={options} />;
};

export default BarChart;
