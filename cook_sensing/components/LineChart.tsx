//折れ線グラフの表示
//APiとは無関係
//
//Paperはこれで変える
const paperOn = true;

import React from "react";
import Paper from "@mui/material/Paper";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartDataset,
  LineControllerDatasetOptions,
  ChartTypeRegistry,
  Point,
  BubbleDataPoint,
  ChartEvent,
  LegendElement,
  ChartType,
  LegendItem,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

//コンポーネントの呼び出し元から送られてくる型
interface LineChartApiArg {
  figureSize: number;
  featureData: (number | null)[];
  average: number;
  label: Label;
}
interface Label {
  mainTitle: string;
  xSubTitle: string;
  ySubTitle: string;
  labels: string[];
}

export const LineChart = ({
  figureSize = 800,
  featureData = [-1, 0, 1],
  average = 0,
  label = {
    mainTitle: "メインタイトル",
    xSubTitle: "X軸サブタイトル",
    ySubTitle: "Y軸サブタイトル",
    labels: ["a", "b", "c"],
  },
}: LineChartApiArg) => {
  //
  // 引数からラベル設定
  const mainTitle = label.mainTitle;
  const xSubTitle = label.xSubTitle;
  const ySubTitle = label.ySubTitle;
  const labels = label.labels;

  // 引数を元にサイズを決定
  const fontSize = figureSize / 35; //フォントのサイズ
  const subTitleFontSize = fontSize; //サブタイトルのサイズ
  const mainTitleFontSize = fontSize * 1.25; //メインタイトルのサイズ
  const numberFontSize = fontSize; //目盛の数字サイズ
  const legendSize = fontSize * 0.9; //凡例のサイズ
  const tooltipFontSize = fontSize; //ツールチップのサイズ
  const titlePaddingTop = figureSize / 80; //タイトル上の余白
  const titlePaddingBottom = figureSize / 120; //タイトル下の余白
  const pointRadiusSize = figureSize / 120; // 点の大きさ
  const pointHoverRadiusSize = figureSize / 60; // 点にマウスを重ねたときの大きさ
  const figureWidthSize = figureSize; // グラフの横幅
  const figureHeightSize = figureSize / 2; // グラフの縦幅
  const tooltipPadding = fontSize / 2; // ツールチップの余白
  const borderWidth = figureSize / 200;

  // 「あなたの記録」の色
  const youBorderColor = "rgb(247,135,0)"; //オレンジ
  const youBackColor = "rgb(247,135,0,0.8)"; //オレンジ
  // 「他人の記録」の色
  const otherBorderColor = "rgb(141,164,7)"; //緑
  const otherBackColor = "rgb(141,164,7,0.8)"; //緑
  // 「平均の記録」の色
  const averageBorderColor = "rgb(150,150,150)"; //黒
  const averageBackColor = "rgb(255,255,255,0)"; //透明(白)
  // 「ツールチップ」の色
  const tooltipBackColor = "rgb(0,0,0,0.7)"; //黒

  //表示する範囲を決定
  const validFeatureData = featureData.filter(
    (temp) => temp !== null
  ) as number[];
  const minFeatureData = Math.min(...validFeatureData); //データの最小値
  const maxFeatureData = Math.max(...validFeatureData); //データの最大値
  let max = 0; //固定値
  let min = 0; //固定値
  const division = 8; //固定値
  if (maxFeatureData < average) {
    //平均の方が最大値より大きい場合
    const range = average - minFeatureData; //範囲
    const chartMargin = range / division; //最大最小ポイントの上下にある余白のサイズ
    min = minFeatureData - chartMargin;
    max = average + chartMargin;
  } else if (minFeatureData > average) {
    //平均の方が最小値より小さい場合
    const range = maxFeatureData - average; //範囲
    const chartMargin = range / division; //最大最小ポイントの上下にある余白のサイズ
    min = average - chartMargin;
    max = maxFeatureData + chartMargin;
  } else {
    const range = maxFeatureData - minFeatureData; //範囲
    const chartMargin = range / division; //最大最小ポイントの上下にある余白のサイズ
    min = minFeatureData - chartMargin;
    max = maxFeatureData + chartMargin;
  }
  // max = Math.ceil(max); //切り上げ
  // min = Math.floor(min); //切り捨て

  // オプション
  const options = {
    responsive: true,
    animation: {
      duration: 0, // アニメーションを無効にする
    },
    plugins: {
      title: {
        display: true,
        text: mainTitle,
        font: {
          size: mainTitleFontSize, // タイトルのフォントサイズ
          weight: "bold", // タイトルのフォントウェイト
        },
        padding: {
          top: titlePaddingTop, // タイトルの上側の余白
          bottom: titlePaddingBottom, // タイトルの下側の余白
        },
      },
      legend: {
        //データ1 とか 凡例
        display: true,
        position: "top", // レジェンドの位置（'top', 'left', 'bottom', 'right'）
        labels: {
          pointStyle: "line", // legendのpointStyleをlineに変更
          usePointStyle: true, // ポイントスタイルを使用してカスタム描画
          font: {
            size: legendSize, // ラベルのフォントサイズを設定．四角もでかくなる
          },
        },
        onClick: () => {},
      },
      tooltip: {
        //ポイントにカーソルを重ねると表示 ツールチップ
        backgroundColor: tooltipBackColor,
        cornerRadius: 3,
        displayColors: true,
        titleFont: {
          size: tooltipFontSize, // タイトルのフォントサイズ
        },
        bodyFont: {
          size: tooltipFontSize, // 本文のフォントサイズ
        },
        padding: tooltipPadding,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xSubTitle,
          font: {
            size: subTitleFontSize, // X軸タイトルのフォントサイズ
            weight: "normal", // X軸タイトルのフォントウェイト
          },
        },
        ticks: {
          font: {
            size: numberFontSize, // X軸メモリのフォントサイズ
            weight: "normal", // X軸メモリのフォントウェイト
          },
        },
        type: "category", // x軸のスケールの型を明示的に指定
      },
      y: {
        title: {
          display: true,
          text: ySubTitle,
          font: {
            size: subTitleFontSize, // X軸タイトルのフォントサイズ
            weight: "normal", // X軸タイトルのフォントウェイト
          },
        },
        ticks: {
          font: {
            size: numberFontSize, // Y軸メモリのフォントサイズ
            weight: "normal", // Y軸メモリのフォントウェイト
          },
        },
        min: min,
        max: max,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "あなた",
        data: featureData,
        borderColor: youBorderColor,
        backgroundColor: youBackColor,
        spanGaps: true,
        pointRadius: pointRadiusSize, // データポイントの大きさ
        pointHoverRadius: pointHoverRadiusSize, // ホバー時のデータポイントを非表示
        borderWidth: borderWidth, // 線の太さを設定
      },
      {
        label: "みんなの平均",
        data: Array(featureData.length).fill(average),
        borderColor: otherBorderColor,
        backgroundColor: otherBackColor,
        spanGaps: true,
        borderDash: [6, 5], // 6pxの線と5pxの隙間の繰り返し
        pointRadius: 0, // データポイントを非表示
        borderWidth: borderWidth, // 線の太さを設定
      },
    ],
  };
  if (paperOn) {
    return (
      <>
        <Paper
          // elevation={1}
          variant="outlined"
          style={{ width: "fit-content", padding: "0.5vw", margin: "0.5vw" }}
        >
          <div style={{ height: figureHeightSize, width: figureWidthSize }}>
            <Line data={data} options={options as any} />
          </div>
        </Paper>
      </>
    );
  } else {
    return (
      <>
        <div style={{ height: figureHeightSize, width: figureWidthSize }}>
          <Line data={data} options={options as any} />
        </div>
      </>
    );
  }
};
