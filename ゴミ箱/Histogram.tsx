//BarFromAPIを改造してより汎用性を高める

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
import { Bar } from "react-chartjs-2"; //ここにも必要なものを追加
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

//コンポーネントの呼び出し元から送られてくる型
interface HistogramApiArg {
  user_id?: string;
  type: string;
  size?: number;
  fontsize?: number;
}

//apiを呼び出して返ってくる値の型
interface HistogramGet {
  datas: number[];
  titles: title;
  grade: number; //ユーザのグレード
}
//上のtitlesの中身
interface title {
  maintitle: string;
  mainlabel: string;
  besidetitle: string;
  verticaltitle: string;
  besidelabel: string[];
}

export const Histogram = ({
  user_id = "", //値がなかった場合に入る
  type = "", //値がなかった場合に入る
  size = 30, //値がなかった場合に入る
  fontsize = 14,
}: HistogramApiArg) => {
  //   const setting: string[] = [];
  //   const [apiData, setApiData] = React.useState(setting);
  //   const [user_id_url, setUser_id_url] = React.useState(user_id);
  const [getData, setGetData] = React.useState<HistogramGet>(); //ここにGetのデータを入れていく

  //   const api = axios.create({
  //     baseURL: "http://localhost:3000/", //http://20.168.98.13:8080/
  //     timeout: 100000,
  //   });
  //url設定
  const url = "http://localhost:3000/histogram/test";
  const fetch = React.useMemo(async () => {
    //apiで接続
    // const data = await axios.get<HistogramGet>(url);
    const { data } = await axios.get<HistogramGet>(url);
    //上記{data}はdataという値から取ってきているため、他の名前で宣言できないっぽい
    console.log("de-ta->" + data.grade);
    setGetData(data);
  }, []);

  React.useEffect(() => {
    fetch;
  }, []);

  const text = getData?.titles.maintitle;
  const options: ChartOptions<"bar"> = {
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
      x: {
        display: true,
        title: {
          display: true,
          //   text: "一秒間あたりの切った回数",
          text: getData?.titles.besidetitle,
          font: { size: fontsize },
        },
        // //ラベルの関係の話
        // ticks: {
        //   callback: function (value: string, index: string, valuesues: string) {
        //     return value + "回"; // 目盛の編集
        //   },
        // },
      },

      y: {
        display: true,
        title: {
          display: true,
          //   text: "人数",
          text: getData?.titles.verticaltitle,
          font: { size: fontsize },
        },
        // reverse: true, //逆向きになる
        ticks: {
          callback(tickValue, index, ticks) {
            return tickValue;
            // return tickValue + "人"; // 目盛の編集
            //tickValue:データの値に応じて変わる
            //index:メモリの横線の数
            //ticks:[object]がいっぱい並んでる
          },
        },
      },
    },
  };

  //背景色
  const yellowBack = "rgba(255, 205, 86, 0.2)";
  const redBack = "rgba(255, 99, 132, 0.2)";
  const backGround: string[] = [];
  var labellength = 100;
  if (getData !== undefined) {
    labellength = getData.titles.besidelabel.length;
  }
  for (var i = 0; i < labellength; i++) {
    if (i != getData?.grade) {
      //自分のデータの色
      backGround.push(yellowBack);
    } else {
      backGround.push(redBack);
    }
  }
  //囲い色
  const yellowBorder = "rgb(255, 205, 86)";
  const redBorder = "rgb(255, 99, 132)";
  const border: string[] = [];
  for (var i = 0; i < labellength; i++) {
    if (i != getData?.grade) {
      //自分のデータの色
      border.push(yellowBorder);
    } else {
      border.push(redBorder);
    }
  }
  const labels = getData?.titles.besidelabel;
  const data = {
    labels,
    datasets: [
      {
        label: "data", //ラベルいるか？
        data: getData?.datas,
        backgroundColor: backGround,
        borderColor: border,
        // グラフの枠線の太さ
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
          // background-image
          // style={{ backgroundColor: "#fafaf5" }}
        >
          {/* <Bar data={data} width={width} height={height} options={options} /> */}
          <Bar data={data} width={1000} height={1000} options={options} />
        </Paper>
      </Paper>
    );
  } else {
    return <></>;
  }
};
