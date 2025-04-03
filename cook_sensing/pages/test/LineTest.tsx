//コンポーネントを利用した折れ線グラフの表示

import React from "react";
import { LineChart, VwToPx, HistogramVer2 } from "../../components";
import Paper from "@mui/material/Paper";

const Graph: React.FC = () => {
  const vw = VwToPx(); //ex. 50 * vw で 50vh と同じ大きさのpxに変換
  const size = 55;
  const featureData = [7.251, 6.9, 6.4, 5.5, null, null, 5.9, 4.9];
  const average = 2.271;
  const mainTitle = "力のブレの大きさ -過去と比較-";
  const xSubTitle = "日付";
  const ySubTitle = "力のブレの大きさ(m/s^2)";
  const labels = [
    "7/16",
    "7/17",
    "7/18",
    "7/19",
    "7/20",
    "7/21",
    "7/22",
    "7/23",
  ];

  //先にまとめて後から引数にする
  const chartProps = {
    figureSize: size * vw,
    featureData: featureData,
    average: average,
    label: {
      mainTitle: mainTitle,
      xSubTitle: xSubTitle,
      ySubTitle: ySubTitle,
      labels: labels,
    },
  };

  return (
    <>
      <LineChart {...chartProps} />

      {/* <LineChart /> */}

      {/* <LineChart
        figureSize={size * vw}
        featureData={featureData}
        average={average}
        label={{
          mainTitle: mainTitle,
          xSubtitle: xSubtitle,
          ySubtitle: ySubtitle,
          labels: labels,
        }}
      /> */}
    </>
  );
};

export default Graph;
