//コンポーネントを利用した折れ線グラフの表示

import React from "react";
import { LineChart, VwToPx, HistogramVer2, BarChart } from "../../components";

const Graph: React.FC = () => {
  const vw = VwToPx(); //ex. 50 * vw で 50vh と同じ大きさのpxに変換
  const size = 55;
  const featureDataHistogram = [
    7.251, 4.9, 2.6, 2.2, 2.1, 1.6, 1.4, 1.2, 0.8, 0.73, 0.7, 0.7,
  ];
  const featureDatabar = [0, 1, 1, 1, 1, 4, 0, 1, 1, 0, 1, 1];
  const mainTitle = "力のブレの大きさ -みんなと比較-";
  const xSubtitle = "階級（回/s）";
  const ySubtitle = "力のブレの大きさ(m/s^2)";
  const labelsHistogram = [
    "0.3",
    "0.4",
    "0.5",
    "0.6",
    "0.7",
    "0.8",
    "0.9",
    "1.0",
    "1.1",
    "1.2",
    "1.3",
    "1.4",
    "1.5",
  ];

  const labelBae = ["", "", "", "", "", "", "", "", "", "", "", ""];
  const youDataNumber = 4;
  const averageDataNumber = 5;

  //先にまとめて後から引数にする
  const HistogramProps = {
    figureSize: size * vw,
    featureData: featureDatabar,
    label: {
      mainTitle: mainTitle,
      xSubTitle: xSubtitle,
      ySubTitle: ySubtitle,
      labels: labelsHistogram,
    },
    youDataNumber: youDataNumber,
  };

  const barChartProps = {
    figureSize: size * vw,
    featureData: featureDataHistogram,
    label: {
      mainTitle: mainTitle,
      ySubTitle: ySubtitle,
      labels: labelBae,
    },
    youDataNumber: youDataNumber,
    averageDataNumber: averageDataNumber,
  };

  return (
    <>
      {/* <HistogramVer2 /> */}
      ヒストグラム
      <HistogramVer2 {...HistogramProps} />
      棒グラフ
      <BarChart {...barChartProps} />
    </>
  );
};

export default Graph;
