// Histogram2
// APIは含めない
// paperは真下の変数から変える
const paperFlg = true;

import React, { useRef } from "react";
import Paper from "@mui/material/Paper";
import { Bar } from "react-chartjs-2";
import { ChartJSOrUndefined } from "react-chartjs-2/dist/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 呼び出し元から送られてくる型
interface BarChartApiArg {
  figureSize: number;
  featureData: number[];
  label: Label;
  youDataNumber: number;
}
interface Label {
  mainTitle: string;
  xSubTitle: string;
  ySubTitle: string;
  labels: string[];
}

export const HistogramVer2 = ({
  figureSize = 800,
  featureData = [1, 3, 5],
  label = {
    mainTitle: "メインタイトル",
    xSubTitle: "X軸サブタイトル",
    ySubTitle: "Y軸サブタイトル",
    labels: ["", "", ""],
  },
  youDataNumber = 2,
}: BarChartApiArg) => {
  // 🔍 プロップスの確認用ログ
  // console.log("=== HistogramVer2 Props ===");
  // console.log("featureData:", featureData);
  // console.log("label:", label);
  // console.log("youDataNumber:", youDataNumber);
  // console.log("============================");

  const chartRef = useRef<ChartJSOrUndefined<"bar">>(null);

  // サイズとスタイル関連設定
  const fontSize = figureSize / 35;
  const mainTitleFontSize = fontSize * 1.25;
  const subTitleFontSize = fontSize;
  const numberFontSize = fontSize;
  const legendSize = fontSize * 0.9;
  const tooltipFontSize = fontSize;
  const titlePaddingTop = figureSize / 80;
  const titlePaddingBottom = figureSize / 120;
  const figureWidthSize = figureSize;
  const figureHeightSize = figureSize / 2;
  const tooltipPadding = fontSize / 2;
  const borderWidth = figureSize / 200;
  const legendBoxWidth = figureSize / 16;
  const legendPadding = figureSize / 30;

  // 色設定
  const youBorderColor = "rgb(247,135,0)";
  const youBackColor = "rgb(247,135,0,0.7)";
  const otherBorderColor = "rgb(141,164,7)";
  const otherBackColor = "rgb(141,164,7,0.7)";
  const tooltipBackColor = "rgb(0,0,0,0.7)";

  // 表示範囲計算
  const validFeatureData = featureData.filter(
    (temp) => temp !== null
  ) as number[];
  const maxFeatureData = Math.max(...validFeatureData);
  const max = maxFeatureData + 1;

  const options = {
    responsive: true,
    animation: {
      duration: 0,
    },
    plugins: {
      title: {
        display: true,
        text: label.mainTitle,
        font: {
          size: mainTitleFontSize,
          weight: "bold",
        },
        padding: {
          top: titlePaddingTop,
          bottom: titlePaddingBottom,
        },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: legendBoxWidth,
          padding: legendPadding,
          font: {
            size: legendSize,
          },
          generateLabels: (chart: ChartJS) => {
            const originalLabels =
              ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            if (originalLabels.length > 0) {
              originalLabels[0].fillStyle = youBackColor;
              originalLabels[0].strokeStyle = youBorderColor;
              originalLabels[0].lineWidth = originalLabels[0].lineWidth || 1;
            }
            return originalLabels.concat([
              {
                text: "みんなの階級",
                fillStyle: otherBackColor,
                strokeStyle: otherBorderColor,
                hidden: false,
                index: 0,
                lineWidth: originalLabels[0].lineWidth,
                pointStyle: "rect",
              },
            ]);
          },
        },
        onClick: () => {},
      },
      tooltip: {
        backgroundColor: tooltipBackColor,
        cornerRadius: 3,
        displayColors: false,
        titleFont: {
          size: tooltipFontSize,
        },
        bodyFont: {
          size: tooltipFontSize,
        },
        callbacks: {
          label: function (tooltipItem: any) {
            return tooltipItem.raw;
          },
        },
        padding: tooltipPadding,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: label.xSubTitle,
          font: {
            size: subTitleFontSize,
            weight: "normal",
          },
        },
        ticks: {
          display: true,
          font: {
            size: numberFontSize,
            weight: "normal",
          },
        },
        type: "category",
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: label.ySubTitle,
          font: {
            size: subTitleFontSize,
            weight: "normal",
          },
        },
        ticks: {
          font: {
            size: numberFontSize,
            weight: "normal",
          },
        },
        max: max,
      },
    },
  };

  // 各バーの色を決定
  const borderColor: string[] = [];
  const backgroundColor: string[] = [];
  for (let i = 0; i < featureData.length; i++) {
    if (i === youDataNumber) {
      borderColor.push(youBorderColor);
      backgroundColor.push(youBackColor);
    } else {
      borderColor.push(otherBorderColor);
      backgroundColor.push(otherBackColor);
    }
  }

  const data = {
    labels: label.labels,
    datasets: [
      {
        label: "あなたの階級",
        data: featureData,
        borderColor,
        backgroundColor,
        borderWidth,
      },
    ],
  };

  if (paperFlg) {
    return (
      <Paper
        variant="outlined"
        style={{ width: "fit-content", padding: "0.5vw", margin: "0.5vw" }}
      >
        <div style={{ height: figureHeightSize, width: figureWidthSize }}>
          <Bar ref={chartRef} data={data} options={options as any} />
        </div>
      </Paper>
    );
  } else {
    return (
      <div style={{ height: figureHeightSize, width: figureWidthSize }}>
        <Bar ref={chartRef} data={data} options={options as any} />
      </div>
    );
  }
};
