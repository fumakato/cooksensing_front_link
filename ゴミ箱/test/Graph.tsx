import React from "react";
import { Line } from "react-chartjs-2";

export const Graph: React.FC = () => {
  // 後から変える変数たち
  const FeatureData = [7.251, 6.9, 6.4, 5.5, null, null, 5.9, 4.9];
  const average = 2.271;
  // const fontSize = 20;
  const figureSize = 500;
  const mainTitle = "力のブレの大きさ -過去と比較-";
  const xSubtitle = "日付";
  const ySubtitle = "力のブレの大きさ(m/s^2)";
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

  // 引数を元にサイズを決定
  const fontSize = figureSize / 40;
  const subTitleFontSize = fontSize; //サブタイトルのサイズ
  const mainTitleFontSize = fontSize * 1.4; //メインタイトルのサイズ
  const numberFontSize = fontSize; //目盛の数字サイズ
  const legendSize = fontSize * 0.9;
  const titlePaddingTop = figureSize / 80;
  const titlePaddingBottom = figureSize / 120;
  const aaa = figureSize / 120;
  const bbb = figureSize / 80;

  // 「あなたの記録」の色
  const youBorderColor = "rgb(247,135,0)"; //オレンジ
  const youBackColor = "rgb(247,135,0,0.8)"; //オレンジ

  // 「他人の記録」の色
  const otherBorderColor = "rgb(141,164,7)"; //緑
  const otherBackColor = "rgb(141,164,7,0.8)"; //緑

  // 「平均の記録」の色
  const averageBorderColor = "rgb(0,0,0)"; //黒
  const averageBackColor = "rgb(255,255,255,0)"; //白

  //表示する範囲を決定
  const validFeatureData = FeatureData.filter(
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

  // オプション
  const options = {
    responsive: true,
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
        //データ1とか
        display: true,
        position: "top", // レジェンドの位置（'top', 'left', 'bottom', 'right'）
        labels: {
          font: {
            size: legendSize, // ラベルのフォントサイズを設定．四角もでかくなる
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xSubtitle,
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
          text: ySubtitle,
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
        // label: `${name}さんの記録`,
        label: "あなた",
        // label: "力のブレの大きさ",
        data: FeatureData,
        borderColor: youBorderColor,
        backgroundColor: youBackColor,
        spanGaps: true,
        pointRadius: aaa, // データポイントを非表示
        pointHoverRadius: bbb, // ホバー時のデータポイントを非表示
      },
      {
        label: "みんなの平均",
        data: Array(FeatureData.length).fill(average),
        borderColor: averageBorderColor,
        backgroundColor: averageBackColor,
        spanGaps: true,
        borderDash: [5, 6], // 5pxの線と6pxの隙間の繰り返し

        // borderDashOffset: 0,
        pointRadius: 0, // データポイントを非表示
        // pointHoverRadius: 0, // ホバー時のデータポイントを非表示
      },
    ],
  };

  return (
    <>
      <div style={{ height: figureSize, width: figureSize }}>
        {/* 固定サイズの設定 */}
        <Line data={data} options={options as any} />
      </div>
    </>
  );
};

export default Graph;
