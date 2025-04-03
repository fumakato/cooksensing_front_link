//レーダーチャートやり直し

import axios from "axios";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, //これがないと動かん。他のグラフを使うならそれに見合ったエレメントが必要
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Radar } from "react-chartjs-2"; //ここにも必要なものを追加
import { Paper } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//コンポーネントの呼び出し元から送られてくる型old
interface RadarApiArg {
  user_id?: string;
  type: string;
  size?: number;
  fontsize?: number;
}

//apiを呼び出して返ってくる値の型old
interface RadarGet {
  datas: number[];
  titles: title;
}
//上のtitlesの中身old
interface title {
  maintitle: string;
  mainlabel: string;
  label: string[];
}

//newコンポーネントの呼び出し元から送られてくる型
interface RadarApiArgNew {
  user_id?: string;
  type: string;
  size?: number;
  fontsize?: number;
}

//apiを呼び出して返ってくる値の型
interface RadarGetNew {
  datas: number[];
  titles: title;
}
//上のtitlesの中身
interface titleNew {
  maintitle: string;
  mainlabel: string;
  label: string[];
}

export const RadarChartDemo2 = ({
  user_id = "", //値がなかった場合に入る
  type = "", //値がなかった場合に入る
  size = 30, //値がなかった場合に入る
  fontsize = 14,
}: RadarApiArg) => {
  const [getData, setGetData] = React.useState<RadarGet>(); //ここにGetのデータを入れていく

  //url設定
  const url = `http://localhost:3000/chart/radarchart/${user_id}`;
  const fetch = React.useMemo(async () => {
    //apiで接続
    const { data } = await axios.get<RadarGet>(url);
    //上記{data}はdataという値から取ってきているため、他の名前で宣言できないっぽい
    console.log("de-ta->" + data);
    setGetData(data);
  }, []);

  React.useEffect(() => {
    fetch;
  }, []);

  const text = getData?.titles.maintitle;

  const options: ChartOptions<"radar"> = {
    responsive: true, //ここをtrueにするとサイズが可変になる。
    //サイズを変えるには呼び出すときにwidthとheightを設定してやる
    plugins: {
      title: {
        display: true, //trueの時はタイトルを表示
        // text: "他人との比較", //タイトルをここに入力
        text: text, //タイトルをここに入力
        font: { size: fontsize * 1.5 },
      },
    },
    scales: {
      // x: {
      //   display: false,
      // },
      // y: {
      //   display: false,
      // },
      // ticks: { beginAtZero: true }, //なんかエラーだからできない
      r: {
        pointLabels: {
          // color: "black",
          font: {
            size: fontsize,
          },
        },
        suggestedMin: 0,
        suggestedMax: 10,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  //囲い色
  //   const labels = getData?.titles.label;
  const labels = [
    "材料を切る速さ",
    "混ぜる速さ",
    "整形の精度",
    "食器を洗う速さ",
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        // label: getData?.titles.mainlabel,
        label: "you",
        data: getData?.datas,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "average",
        data: [5, 4, 5, 6],
        backgroundColor: "rgba(30, 60, 30, 0.2)",
        borderColor: "rgba(60, 120, 60, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (getData !== undefined) {
    return (
      <Paper
        sx={{
          p: 2,
          // m: 1,
          // margin: "auto",
          m: "10px auto",
          maxWidth: "90%",
          flexGrow: 1,
        }}
      >
        <Paper
          // デバッグよう。elevationは0にするとい
          elevation={0}
          sx={{
            p: 1,
            height: `${size}vw`,
            width: `${size}vw`,
            m: "0px auto",
          }}
        >
          <Radar data={data} width={1000} height={1000} options={options} />
        </Paper>
      </Paper>
    );
  } else {
    return <></>;
  }
};
