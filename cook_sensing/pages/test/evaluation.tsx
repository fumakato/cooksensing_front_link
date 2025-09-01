import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.jsの構成要素を登録
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// 評価データ（コード内に直接記述）
const evaluationData = {
  evaluation: [
    { name: "洗う", 総合評価: 4.25 },
    { name: "皮剥き", 総合評価: 4.05 },
    { name: "くし切り", 総合評価: 4.2 },
    { name: "半月切り", 総合評価: 4.1 },
    { name: "乱切り", 総合評価: 3.95 },
    { name: "炒める", 総合評価: 4.4 },
    { name: "調味料の投入", 総合評価: 4.5 },
    { name: "煮込む", 総合評価: 4.4 },
    { name: "煮詰める", 総合評価: 4.5 },
  ],
};

// レーダーチャート用データ
const chartData = {
  labels: evaluationData.evaluation.map((item) => item.name),
  datasets: [
    {
      label: "総合評価",
      data: evaluationData.evaluation.map((item) => item.総合評価),
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

// レーダーチャートオプション
const chartOptions = {
  scales: {
    r: {
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
        color: "#333",
        backdropColor: "transparent",
      },
      pointLabels: {
        font: {
          size: 14,
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const EvaluationPage: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>全体の調理ステップ評価</h1>

      {/* テキストによる評価表示 */}
      <ul style={{ marginBottom: "40px" }}>
        {evaluationData.evaluation.map((item, idx) => (
          <li key={idx}>
            {item.name}: {item.総合評価.toFixed(2)} 点
          </li>
        ))}
      </ul>

      {/* レーダーチャート */}
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
};

export default EvaluationPage;

// import React from "react";
// import { Radar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // レーダーチャート用に必要なコンポーネントを登録
// ChartJS.register(
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend
// );

// // データ（直接記述）
// const evaluationData = {
//   evaluation: [
//     { name: "洗う", 総合評価: 4.25 },
//     { name: "皮剥き", 総合評価: 4.05 },
//     { name: "くし切り", 総合評価: 4.2 },
//     { name: "半月切り", 総合評価: 4.1 },
//     { name: "乱切り", 総合評価: 3.95 },
//     { name: "炒める", 総合評価: 4.4 },
//     { name: "調味料の投入", 総合評価: 4.5 },
//     { name: "煮込む", 総合評価: 4.4 },
//     { name: "煮詰める", 総合評価: 4.5 },
//   ],
// };

// const chartData = {
//   labels: evaluationData.evaluation.map((item) => item.name),
//   datasets: [
//     {
//       label: "総合評価",
//       data: evaluationData.evaluation.map((item) => item.総合評価),
//       backgroundColor: "rgba(54, 162, 235, 0.2)",
//       borderColor: "rgba(54, 162, 235, 1)",
//       borderWidth: 2,
//       pointBackgroundColor: "rgba(54, 162, 235, 1)",
//     },
//   ],
// };

// const chartOptions = {
//   scales: {
//     r: {
//       min: 0,
//       max: 5,
//       ticks: {
//         stepSize: 1,
//         color: "#333",
//         backdropColor: "transparent",
//       },
//       pointLabels: {
//         font: {
//           size: 14,
//         },
//       },
//     },
//   },
//   plugins: {
//     legend: {
//       display: false,
//     },
//   },
// };

// const EvaluationPage: React.FC = () => {
//   return (
//     <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//       <h1>全体の調理ステップ評価</h1>
//       <Radar data={chartData} options={chartOptions} />
//     </div>
//   );
// };

// export default EvaluationPage;

// import React from "react";

// const evaluationData = {
//   evaluation: [
//     { name: "洗う", 総合評価: 4.25 },
//     { name: "皮剥き", 総合評価: 4.05 },
//     { name: "くし切り", 総合評価: 4.2 },
//     { name: "半月切り", 総合評価: 4.1 },
//     { name: "乱切り", 総合評価: 3.95 },
//     { name: "炒める", 総合評価: 4.4 },
//     { name: "調味料の投入", 総合評価: 4.5 },
//     { name: "煮込む", 総合評価: 4.4 },
//     { name: "煮詰める", 総合評価: 4.5 },
//   ],
// };

// const EvaluationPage: React.FC = () => {
//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//       <h1>全体の調理ステップ評価</h1>
//       <ul>
//         {evaluationData.evaluation.map((item, idx) => (
//           <li key={idx}>
//             {item.name}: {item.総合評価.toFixed(2)} 点
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default EvaluationPage;
