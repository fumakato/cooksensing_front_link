//BarChart

//APIは含めない
//paperは真下の変数から変える
const paperFlg = true;
const arrowFlg = true; //更新で反映

import React, { useEffect, useRef } from "react";
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
  Plugin,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//コンポーネントの呼び出し元から送られてくる型
interface BarChartApiArg {
  figureSize: number;
  featureData: number[];
  label: Label;
  youDataNumber: number;
  averageDataNumber: number;
}
interface Label {
  mainTitle: string;
  ySubTitle: string;
  labels: string[];
}

// カスタムプラグインの定義
const createArrowPlugin = (figureSize: number, arrowFlg: boolean): Plugin => {
  return {
    id: "arrowPlugin",
    afterDraw: (chart: ChartJS) => {
      if (arrowFlg) {
        const arrowTextSize = figureSize / 35; //テキストサイズ
        const arrowSize = figureSize / 65; // 矢印の頭のサイズ
        const arrowMargin = figureSize / 14; //矢印の左右のマージン
        const arrowLineWidth = figureSize / 160;
        const { ctx, scales } = chart;
        const yScale = scales.y;
        const xScale = scales.x;

        //縦1目盛に増加する値の計算
        const yTickValues = yScale.ticks.map((tick) => tick.value);
        const yStepValue =
          yTickValues.length > 1 ? yTickValues[1] - yTickValues[0] : 0;
        const positionY = yStepValue * -0.6; // 矢印の高さ
        // const positionY = -1; // 矢印の高さ

        // const y = yScale.getPixelForValue(positionY); // Y軸の位置
        const y = figureSize / 2 - figureSize / 35;
        const startX = xScale.left + arrowMargin;
        const endX = xScale.right - arrowMargin;

        ctx.save();
        ctx.strokeStyle = "#666";
        ctx.fillStyle = "#666";
        ctx.lineWidth = arrowLineWidth;

        // 左矢印
        ctx.beginPath();
        ctx.lineWidth = arrowLineWidth;
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();

        const arrowMove = figureSize / 130;
        // console.log("arrowMove: " + arrowMove);

        // 左矢印の頭
        ctx.beginPath();
        ctx.moveTo(startX - arrowMove, y);
        ctx.lineTo(startX + arrowSize * 1.8, y - arrowSize);
        ctx.lineTo(startX + arrowSize * 1.8, y + arrowSize);
        ctx.closePath();
        ctx.fill();

        // 右矢印の頭
        ctx.beginPath();
        ctx.moveTo(endX + arrowMove, y);
        ctx.lineTo(endX - arrowSize * 1.8, y - arrowSize);
        ctx.lineTo(endX - arrowSize * 1.8, y + arrowSize);
        ctx.closePath();
        ctx.fill();

        const arrowTextXMaegin = figureSize / 54;
        const arrowTextYMaegin = figureSize / 200;

        // テキスト
        ctx.font = `${arrowTextSize}px`;
        // ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(
          "優",
          endX + arrowSize + arrowTextXMaegin,
          y + arrowTextYMaegin
        ); // テキストの位置
        ctx.fillText(
          "劣",
          startX - arrowSize - arrowTextXMaegin,
          y + arrowTextYMaegin
        ); // テキストの位置

        ctx.restore();
      }
    },
  };
};

export const BarChart = ({
  figureSize = 800,
  featureData = [1, 3, 5],
  label = {
    mainTitle: "メインタイトル",
    ySubTitle: "Y軸サブタイトル",
    labels: ["", "", ""],
  },
  youDataNumber = 2,
  averageDataNumber = 1,
}: BarChartApiArg) => {
  const rawFeatureData = [...featureData];

  const chartRef = useRef<ChartJSOrUndefined<"bar">>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      if (chart.config.plugins) {
        const pluginIndex = chart.config.plugins.findIndex(
          (plugin) => plugin.id === "arrowPlugin"
        );
        if (pluginIndex !== -1) {
          chart.config.plugins.splice(pluginIndex, 1); // 既存のプラグインを削除
        }
        chart.config.plugins.push(createArrowPlugin(figureSize, arrowFlg)); // 新しいプラグインを追加
        chart.update(); // グラフを更新
      }
    }
  }, [figureSize]);
  //
  // 引数からラベル設定
  const mainTitle = label.mainTitle;
  const xSubTitle = "";
  const ySubTitle = label.ySubTitle;
  const labels = label.labels;

  figureSize;
  // console.log("figureSize: " + figureSize);

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
  const borderWidth = figureSize / 200; //グラフの周りの濃い線の幅
  const legendBoxWidth = figureSize / 16; //凡例の四角の横幅
  const legendPadding = figureSize / 30; //凡例同士の隙間

  // 「あなたの記録」の色
  const youBorderColor = "rgb(247,135,0)"; //オレンジ
  const youBackColor = "rgb(247,135,0,0.7)"; //オレンジ
  // 「他人の記録」の色
  const otherBorderColor = "rgb(141,164,7)"; //緑
  const otherBackColor = "rgb(141,164,7,0.7)"; //緑
  // 「平均の記録」の色
  const averageBorderColor = "rgb(80,80,80)"; //黒
  const averageBackColor = "rgb(80,80,80,0.7)"; //透明(白)
  // 「ツールチップ」の色
  const tooltipBackColor = "rgb(0,0,0,0.7)"; //黒

  //表示する範囲を決定(ヒストグラムのみ)
  const validFeatureData = rawFeatureData.filter(
    (temp) => temp !== null
  ) as number[];
  const maxFeatureData = Math.max(...validFeatureData); //データの最大値
  const max = maxFeatureData + 1;

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
        display: true,
        position: "top", // レジェンドの位置（'top', 'left', 'bottom', 'right'）
        labels: {
          boxWidth: legendBoxWidth, // 四角形の幅を指定
          padding: legendPadding, // ここでLegend同士のスペースを設定します
          font: {
            size: legendSize, // ラベルのフォントサイズを設定．四角もでかくなる
          },
          generateLabels: (chart: ChartJS) => {
            const originalLabels =
              ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
            // Dataset 1 の色を変更
            if (originalLabels.length > 0) {
              // エラーを防ぐためのチェック
              originalLabels[0].fillStyle = youBackColor; // カスタム色
              originalLabels[0].strokeStyle = youBorderColor; // カスタム色
              originalLabels[0].lineWidth = originalLabels[0].lineWidth || 1; // デフォルトの枠線の太さ
            }
            return originalLabels.concat([
              {
                text: "みんな",
                fillStyle: otherBackColor,
                strokeStyle: otherBorderColor,
                hidden: false,
                index: 0,
                lineWidth: originalLabels[0].lineWidth, // 枠線の太さをデフォルトと同じにする
                pointStyle: "rect",
              },
              {
                text: "平均",
                fillStyle: averageBackColor,
                strokeStyle: averageBorderColor,
                hidden: false,
                index: 0,
                lineWidth: originalLabels[0].lineWidth, // 枠線の太さをデフォルトと同じにする
                pointStyle: "rect",
              },
            ]);
          },
        },
        onClick: () => {},
      },
      tooltip: {
        //ポイントにカーソルを重ねると表示 ツールチップ
        backgroundColor: tooltipBackColor,
        cornerRadius: 3,
        displayColors: false,
        titleFont: {
          size: tooltipFontSize, // タイトルのフォントサイズ
        },
        bodyFont: {
          size: tooltipFontSize, // 本文のフォントサイズ
        },
        callbacks: {
          label: function (tooltipItem: any) {
            // データポイントに対するカスタムラベル
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
          text: xSubTitle,
          font: {
            size: subTitleFontSize, // X軸タイトルのフォントサイズ
            weight: "normal", // X軸タイトルのフォントウェイト
          },
        },
        ticks: {
          display: false,
          font: {
            size: numberFontSize, // X軸メモリのフォントサイズ
            weight: "normal", // X軸メモリのフォントウェイト
          },
        },
        type: "category", // x軸のスケールの型を明示的に指定
      },
      y: {
        beginAtZero: true,
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
        //表示する範囲を決定(ヒストグラムのみ)
        max: max,
      },
    },
  };

  //データの色を決める
  const borderColor: string[] = [];
  const backgroundColor: string[] = [];
  for (var i = 0; i < rawFeatureData.length; i++) {
    // if (i == youDataNumber) {
    if (i === youDataNumber && i < rawFeatureData.length) {
      //自分のデータの色
      borderColor.push(youBorderColor);
      backgroundColor.push(youBackColor);
      // } else if (i == averageDataNumber) {
    } else if (i === averageDataNumber && i < rawFeatureData.length) {
      //平均のデータの色
      borderColor.push(averageBorderColor);
      backgroundColor.push(averageBackColor);
    } else {
      //みんなのデータの色
      borderColor.push(otherBorderColor);
      backgroundColor.push(otherBackColor);
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "あなた",
        data: rawFeatureData,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        borderWidth: borderWidth,
      },
    ],
  };

  if (paperFlg) {
    return (
      <>
        <Paper
          // elevation={1}
          variant="outlined"
          style={{ width: "fit-content", padding: "0.5vw", margin: "0.5vw" }}
        >
          <div style={{ height: figureHeightSize, width: figureWidthSize }}>
            <Bar ref={chartRef} data={data} options={options as any} />
          </div>
        </Paper>
      </>
    );
  } else {
    return (
      <>
        <div style={{ height: figureHeightSize, width: figureWidthSize }}>
          <Bar ref={chartRef} data={data} options={options as any} />
        </div>
      </>
    );
  }
};
