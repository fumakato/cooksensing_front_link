import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.jsに必要な要素を登録
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const recipeData = {
  recipes: [
    {
      recipeName: "カレー",
      steps: [
        {
          name: "洗う",
          evaluations: [
            { label: "速さ", value: 0.6, unit: "m/s" },
            { label: "安定性", value: 4.5, unit: "" },
            { label: "綺麗さ", value: 4.6, unit: "点" },
            { label: "総合評価", value: 4.3, unit: "点" },
          ],
        },
        {
          name: "皮剥き",
          evaluations: [
            { label: "速さ", value: 3.2, unit: "個/分" },
            { label: "安定性", value: 4.2, unit: "" },
            { label: "綺麗さ", value: 4.1, unit: "点" },
            { label: "総合評価", value: 4.0, unit: "点" },
          ],
        },
        {
          name: "くし切り",
          evaluations: [
            { label: "速さ", value: 2.7, unit: "個/分" },
            { label: "安定性", value: 4.4, unit: "" },
            { label: "綺麗さ", value: 4.4, unit: "点" },
            { label: "総合評価", value: 4.2, unit: "点" },
          ],
        },
        {
          name: "半月切り",
          evaluations: [
            { label: "速さ", value: 2.5, unit: "個/分" },
            { label: "安定性", value: 4.0, unit: "" },
            { label: "綺麗さ", value: 4.0, unit: "点" },
            { label: "総合評価", value: 4.1, unit: "点" },
          ],
        },
        {
          name: "乱切り",
          evaluations: [
            { label: "速さ", value: 2.9, unit: "個/分" },
            { label: "安定性", value: 3.8, unit: "" },
            { label: "綺麗さ", value: 3.8, unit: "点" },
            { label: "総合評価", value: 3.9, unit: "点" },
          ],
        },
        {
          name: "炒める",
          evaluations: [
            { label: "速さ", value: 0.8, unit: "m/s" },
            { label: "時間", value: 150, unit: "秒" },
            { label: "焦げ", value: 0.5, unit: "点" },
            { label: "総合評価", value: 4.5, unit: "点" },
          ],
        },
        {
          name: "調味料の投入",
          evaluations: [
            { label: "量の正確性", value: 97, unit: "%" },
            { label: "手際の良さ", value: 4.7, unit: "点" },
            { label: "総合評価", value: 4.6, unit: "点" },
          ],
        },
        {
          name: "煮込む",
          evaluations: [
            { label: "時間", value: 1200, unit: "秒" },
            { label: "火加減", value: 3, unit: "段階" },
            { label: "総合評価", value: 4.4, unit: "点" },
          ],
        },
      ],
    },
    {
      recipeName: "肉じゃが",
      steps: [
        {
          name: "洗う",
          evaluations: [
            { label: "速さ", value: 0.5, unit: "m/s" },
            { label: "安定性", value: 4.3, unit: "" },
            { label: "綺麗さ", value: 4.7, unit: "点" },
            { label: "総合評価", value: 4.2, unit: "点" },
          ],
        },
        {
          name: "皮剥き",
          evaluations: [
            { label: "速さ", value: 3.0, unit: "個/分" },
            { label: "安定性", value: 4.5, unit: "" },
            { label: "綺麗さ", value: 4.2, unit: "点" },
            { label: "総合評価", value: 4.1, unit: "点" },
          ],
        },
        {
          name: "くし切り",
          evaluations: [
            { label: "速さ", value: 2.8, unit: "個/分" },
            { label: "安定性", value: 4.6, unit: "" },
            { label: "綺麗さ", value: 4.3, unit: "点" },
            { label: "総合評価", value: 4.2, unit: "点" },
          ],
        },
        {
          name: "乱切り",
          evaluations: [
            { label: "速さ", value: 3.1, unit: "個/分" },
            { label: "安定性", value: 4.1, unit: "" },
            { label: "綺麗さ", value: 3.9, unit: "点" },
            { label: "総合評価", value: 4.0, unit: "点" },
          ],
        },
        {
          name: "炒める",
          evaluations: [
            { label: "速さ", value: 0.7, unit: "m/s" },
            { label: "時間", value: 140, unit: "秒" },
            { label: "焦げ", value: 0.4, unit: "点" },
            { label: "総合評価", value: 4.3, unit: "点" },
          ],
        },
        {
          name: "調味料の投入",
          evaluations: [
            { label: "量の正確性", value: 95, unit: "%" },
            { label: "手際の良さ", value: 4.6, unit: "点" },
            { label: "総合評価", value: 4.4, unit: "点" },
          ],
        },
        {
          name: "煮詰める",
          evaluations: [
            { label: "時間", value: 1100, unit: "秒" },
            { label: "火加減", value: 4, unit: "段階" },
            { label: "総合評価", value: 4.5, unit: "点" },
          ],
        },
      ],
    },
  ],
};
// カレー or 肉じゃがを指定
const recipe = recipeData.recipes.find((r) => r.recipeName === "カレー");

const CurryPage: React.FC = () => {
  if (!recipe) {
    return <div>レシピが見つかりませんでした。</div>;
  }

  // グラフ用データ構築：各ステップの総合評価を抽出
  const stepLabels = recipe.steps.map((step) => step.name);
  const overallScores = recipe.steps.map((step) => {
    const overall = step.evaluations.find((e) => e.label === "総合評価");
    return overall ? overall.value : 0;
  });

  const chartData = {
    labels: stepLabels,
    datasets: [
      {
        label: "総合評価",
        data: overallScores,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>{recipe.recipeName}</h1>

      {/* テキストでの評価表示 */}
      {recipe.steps.map((step, idx) => (
        <div key={idx} style={{ marginBottom: "20px" }}>
          <h3>{step.name}</h3>
          <ul>
            {step.evaluations.map((evalItem, i) => (
              <li key={i}>
                {evalItem.label}: {evalItem.value} {evalItem.unit}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* 総合評価の棒グラフ */}
      <h2 style={{ marginTop: "40px" }}>総合評価の比較</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default CurryPage;
