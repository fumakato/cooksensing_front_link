//コンポーネントを利用した折れ線グラフの表示

import React, { useEffect, useState } from "react";
import { LineChart, VwToPx, HistogramVer2, BarChart } from "../../components";
import axios from "axios";
import { Paper, Grid } from "@mui/material";

interface Option {
  acceleration_standard_deviation: number;
  action_id: number;
  average_pace: number;
  created_at: string;
  date: string;
  deleted_at: string | null;
  id: number;
  updated_at: string;
  user_id: number;
}

interface AverageData {
  acceleration_standard_deviation: number;
  average_pace: number;
}

interface UserData {
  acceleration_standard_deviation: number;
  average_pace: number;
  created_at: string;
  deleted_at: string | null;
  updated_at: string;
  user_id: number;
}

// Goから送られてくるヒストグラム用パラメータ
interface HistogramData {
  action_id: number;
  created_at: string;
  deleted_at: string | null;
  display_item_id: number;
  id: number;
  max: number;
  min: number;
  range: number;
  time1: number;
  time2: number;
  time3: number;
  time4: number;
  time5: number;
  time6: number;
  time7: number;
  time8: number;
  time9: number;
  time10: number;
  updated_at: string;
}

interface HistogramProps {
  figureSize: number;
  featureData: number[];
  label: {
    mainTitle: string;
    xSubTitle: string;
    ySubTitle: string;
    labels: string[];
  };
  youDataNumber: number;
}

interface UserInfoData {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  tsukurepo_id: string;
  name: string;
  firebase_auth_uid: string;
  is_identification: boolean;
  identity_verification_text: string;
}

// とりあえずのuserID firebaseauthで取ってくる
// const TmpUserID = 3;
const url = "http://localhost:8080";

// 棒グラフ日付表示用の変換する関数を定義
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2); // 年の下二桁を取得
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月は0から始まるので+1する
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}/${day}`;
} // こいつは他ファイルに入れた方が見栄えが良い

const Graph: React.FC = () => {
  // 変数定義
  const [options, setOptions] = useState<Option[]>([]); // リストの中身
  const [date, setDate] = useState<string[]>([]);
  const [accelerationStandardDeviation, setAccelerationStandardDeviation] =
    useState<(number | null)[]>([]);
  const [averagePaces, setAveragePaces] = useState<(number | null)[]>([]);
  const [averageData, setAverageData] = useState<AverageData>({
    acceleration_standard_deviation: 0,
    average_pace: 0,
  });
  const [bestData, setBestData] = useState<UserData[]>([]); // リストの中身
  const [bestAveragePace, setBestAveragePace] = useState<UserData[]>([]);
  const [
    bestAccelerationStandardDeviation,
    setBestAccelerationStandardDeviation,
  ] = useState<UserData[]>([]);
  const [barAccUserNumber, setBarAccUserNumber] = useState<number>(-1);
  const [barPaceUserNumber, setBarPaceUserNumber] = useState<number>(-1);
  const [barAccAverageNumber, setBarAccAverageNumber] = useState<number>(-1);
  const [barPaceAverageNumber, setBarPaceAverageNumber] = useState<number>(-1);

  const [barAccData, setBarAccData] = useState<number[]>([]);
  const [barPaceData, setBarPaceData] = useState<number[]>([]);

  // ヒストグラム
  const [histogramData, setHistogramData] = useState<HistogramData[]>([]);
  const [histogramAccFeatureData, setHistogramAccFeatureData] = useState<
    number[]
  >([]);
  const [histogramPaceFeatureData, setHistogramPaceFeatureData] = useState<
    number[]
  >([]);
  const [histogramAccLabels, setHistogramAccLabels] = useState<string[]>([]);
  const [histogramPaceLabels, setHistogramPaceLabels] = useState<string[]>([]);
  const [histogramAccUserNumber, setHistogramAccUserNumber] =
    useState<number>(-1);
  const [histogramPaceUserNumber, setHistogramPaceUserNumber] =
    useState<number>(-1);

  // デモ用
  const [tmpUserID, setIdNumber] = useState<number | "">(1);
  // 数値が入力されたときに状態を更新する関数
  const handleChange = (e: any) => {
    const value = e.target.value;
    // 数値として状態を更新する（空文字の処理も追加）
    setIdNumber(value === "" ? "" : Number(value));
  };
  const [users, setUsers] = useState<UserInfoData[]>([]);
  const [dispUser, setDispUser] = useState<string>("");

  //firebaseauthuidを使ってuserIDをとってくる
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${url}/users/search_user_by_firebase_auth_uid`,
          {
            firebase_auth_uid: "bbb",
          }
        ); // 必要なパラメータを指定
        setIdNumber(response.data.id);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  // APIからデータを取得する関数
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 折れ線グラフ用データ
        const response = await axios.post(
          `${url}/feature_data/by_userid_within_days`,
          {
            user_id: tmpUserID,
            days: 7,
            // 0の場合は全ての日付で
          }
        ); // 必要なパラメータを指定
        setOptions(response.data.data);
        // console.log("by_userid_within_days:");
        // console.log("Success:", response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      try {
        //棒グラフ用でデータ
        const response = await axios.get(`${url}/best`);
        setBestData(response.data.data);
        // console.log("Success:", response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      try {
        //ヒストグラム用でデータ
        const response = await axios.get(`${url}/histogram`);
        setHistogramData(response.data.data);
        // console.log("Success:", response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      try {
        //全員の平均データ
        const response = await axios.get(`${url}/best/average`);
        setAverageData(response.data);
        // console.log("Success:", response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      try {
        //全員の個人データ
        const response = await axios.get(`${url}/users`);
        setUsers(response.data.data);
        // console.log("Success:", response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
    console.log("users");
    console.log(users);
  }, [tmpUserID]);

  // 棒グラフ用
  useEffect(() => {
    if (
      // averageData.acceleration_standard_deviation !== 0 &&
      averageData.average_pace !== 0
    ) {
      if (bestData.length !== 0) {
        const num = bestData.findIndex((item) => item.user_id === -100);
        if (num == -1) {
          const bestAverage: UserData = {
            acceleration_standard_deviation:
              averageData.acceleration_standard_deviation,
            average_pace: averageData.average_pace,
            user_id: -100,
            created_at: "",
            updated_at: "",
            deleted_at: null,
          };
          // bestData.push(bestAverage);
          // setBestData(bestData);
          setBestData([...bestData, bestAverage]);
        }
      }
    }
  }, [averageData, bestData]);

  useEffect(() => {
    const num = bestData.findIndex((item) => item.user_id === -100);
    if (num !== -1) {
      // ソート　ブレ
      const sortedAccelerationData = [...bestData].sort(
        (a, b) =>
          b.acceleration_standard_deviation - a.acceleration_standard_deviation
      );
      setBestAccelerationStandardDeviation(sortedAccelerationData);

      const accelerationStandardDeviations = sortedAccelerationData.map(
        (item) => item.acceleration_standard_deviation
      );
      setBarAccData(accelerationStandardDeviations);

      const sortedPaceData = [...bestData].sort(
        (a, b) => a.average_pace - b.average_pace
      );
      setBestAveragePace(sortedPaceData);

      // averagePaces
      const averagePaces = sortedPaceData.map((item) => item.average_pace);
      setBarPaceData(averagePaces);
    }
  }, [bestData]);

  // 棒グラフ用
  useEffect(() => {
    //Idを持つデータのインデックスを取得
    const index = bestAveragePace.findIndex(
      (item) => item.user_id === tmpUserID
    );
    // console.log("bestAveragePace");
    // console.log(bestAveragePace);
    if (index !== -1) {
      setBarPaceUserNumber(index);
    }
    const index2 = bestAveragePace.findIndex((item) => item.user_id === -100);
    if (index2 !== -1) {
      setBarPaceAverageNumber(index2);
    }
  }, [bestAveragePace]);

  // 棒グラフ用
  useEffect(() => {
    //Idを持つデータのインデックスを取得
    const index3 = bestAccelerationStandardDeviation.findIndex(
      (item) => item.user_id === tmpUserID
    );
    // console.log("bestAccelerationStandardDeviation");
    // console.log(bestAccelerationStandardDeviation);
    if (index3 !== -1) {
      setBarAccUserNumber(index3);
    }
    const index4 = bestAccelerationStandardDeviation.findIndex(
      (item) => item.user_id === -100
    );
    if (index4 !== -1) {
      setBarAccAverageNumber(index4);
    }
  }, [bestAccelerationStandardDeviation]);

  type DateEntry = {
    date: string;
    id: number | null;
  };

  //ラベル関係を作る関数
  const fillDates = (data: Option[]): DateEntry[] => {
    // dateプロパティのみをDateオブジェクトに変換して配列に格納
    console.log("ここ:", data);
    const dateObjects = data.map((item) => {
      const date = new Date(item.date); // ISO形式の文字列をDateオブジェクトに変換
      return { original: item.date, date, id: item.id };
    });

    // 昇順でソート
    dateObjects.sort((a, b) => a.date.getTime() - b.date.getTime());

    // 最古と最新の日付のみに注目
    console.log("dateObjects:", dateObjects);
    const startDate = dateObjects[0].date;
    const endDate = new Date(dateObjects[dateObjects.length - 1].date);
    endDate.setHours(23, 59, 59, 999); // 時間をその日の終わりに設定

    // 結果の配列を作成
    const result: DateEntry[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      // 同じ日付に複数のデータがある場合も考慮し、filterを使用
      const sameDayEntries = dateObjects.filter(
        (d) =>
          d.date.getFullYear() === currentDate.getFullYear() &&
          d.date.getMonth() === currentDate.getMonth() &&
          d.date.getDate() === currentDate.getDate()
      );

      if (sameDayEntries.length > 0) {
        // データがある場合はすべて追加
        sameDayEntries.forEach((entry) => {
          result.push({
            date: `${currentDate.getFullYear()}/${
              currentDate.getMonth() + 1
            }/${currentDate.getDate()}/${entry.date.getHours()}:${entry.date.getMinutes()}`,
            id: entry.id,
          });
        });
      } else {
        // データがない場合は日付のみでIDはnullとして追加
        result.push({
          date: `${currentDate.getFullYear()}/${
            currentDate.getMonth() + 1
          }/${currentDate.getDate()}`,
          id: null,
        });
      }

      // 次の日に進む
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  };

  // 年/月/日 時:分 または 年/月/日 の配列を取得する関数
  const extractDateTimes = (data: DateEntry[]): string[] => {
    return data.map((entry) => {
      const [year, month, day, time] = entry.date.split("/");

      // 時間情報があるかどうかで返すフォーマットを変更
      return time
        ? `${year}/${month}/${day} ${time}`
        : `${year}/${month}/${day}`;
    });
  };

  // average_paceの配列を取得する関数
  const extractAveragePace = (
    dateEntries: DateEntry[],
    data: Option[]
  ): (number | null)[] => {
    return dateEntries.map((entry) => {
      if (entry.id !== null) {
        // `data`配列からIDが一致するaverage_paceを見つける
        const matchingData = data.find((item) => item.id === entry.id);
        return matchingData ? matchingData.average_pace : null;
      }
      // IDがnullの場合
      return null;
    });
  };

  // acceleration_standard_deviationの配列を取得する関数
  const extractAccelerationStandardDeviation = (
    dateEntries: DateEntry[],
    data: Option[]
  ): (number | null)[] => {
    return dateEntries.map((entry) => {
      if (entry.id !== null) {
        // `data`配列からIDが一致するacceleration_standard_deviationを見つける
        const matchingData = data.find((item) => item.id === entry.id);
        return matchingData
          ? matchingData.acceleration_standard_deviation
          : null;
      }
      // IDがnullの場合
      return null;
    });
  };

  // 折れ線グラフデータの処理
  useEffect(() => {
    if (Array.isArray(options) && options.length > 0) {
      //上の関数を使用
      console.log("options:", options);
      const filledDates = fillDates(options);

      const dateTimesOnly = extractDateTimes(filledDates);
      setDate(dateTimesOnly);

      const averagePaces = extractAveragePace(filledDates, options);
      setAveragePaces(averagePaces);

      const accelerationStandardDeviation =
        extractAccelerationStandardDeviation(filledDates, options);
      setAccelerationStandardDeviation(accelerationStandardDeviation);

      // // averagePaces
      // const averagePaces = options.map((option) => option.average_pace);
      // setAveragePaces(averagePaces);

      // // acceleration_standard_deviation
      // const acceleration_standard_deviation = options.map(
      //   (option) => option.acceleration_standard_deviation
      // );
      // setAccelerationStandardDeviation(acceleration_standard_deviation);

      // // ラベル用の日付の抽出
      // const date = options.map((option) => option.date);
      // // console.log("date:", date);
      // // ラベル用に文字列操作
      // const formattedDates = date.map(formatDate);
      // setDate(formattedDates);
    } else {
      console.error("options is not an array:", options);
    }
  }, [options]);

  //  ヒストグラム用
  useEffect(() => {
    // console.log("histogramData");
    if (histogramData.length > 0) {
      const times = histogramData.map((item) => {
        return [
          item.time1,
          item.time2,
          item.time3,
          item.time4,
          item.time5,
          item.time6,
          item.time7,
          item.time8,
          item.time9,
          item.time10,
        ];
      });
      // times[0]はペース
      // times[1]はブレ
      setHistogramPaceFeatureData(times[0]);
      setHistogramAccFeatureData(times[1]);

      const labels = histogramData.map((item) => {
        // console.log("item");
        // console.log(item);
        return Array.from({ length: 10 }, (_, i) =>
          (item.min + (item.range / 10) * i).toFixed(2)
        ); // min + range * i を文字列にして格納
      });
      setHistogramPaceLabels(labels[0]);
      setHistogramAccLabels(labels[1]);
      // console.log(labels[0]);
      // console.log(labels[1]);
    }
  }, [histogramData]);

  // ヒストグラム用のユーザの番号算出(ブレ)
  useEffect(() => {
    if (barAccUserNumber !== -1 && histogramAccLabels.length > 0) {
      const userAccelerationStandardDeviation =
        bestAccelerationStandardDeviation[barAccUserNumber]
          .acceleration_standard_deviation;
      const range = histogramData[1].range / 10;
      histogramAccLabels.map((item, index) => {
        // console.log(histogramData[1].min);
        if (index == 0) {
          if (
            histogramData[1].min <= userAccelerationStandardDeviation &&
            userAccelerationStandardDeviation <= histogramData[1].min + range
          ) {
            setHistogramAccUserNumber(index);
          }
        } else {
          if (
            Number(item) <= userAccelerationStandardDeviation &&
            userAccelerationStandardDeviation <= Number(item) + range
          ) {
            setHistogramAccUserNumber(index);
          }
        }
      });
      // console.log(range);
      // console.log(Number(histogramAccLabels[9]) + range);
    }
  }, [histogramAccLabels, barAccUserNumber]);

  // ヒストグラム用のユーザの番号算出(ペース)
  useEffect(() => {
    if (barPaceUserNumber !== -1 && histogramPaceLabels.length > 0) {
      const userAveragePace = bestAveragePace[barPaceUserNumber].average_pace;
      const range = histogramData[0].range / 10;
      histogramPaceLabels.map((item, index) => {
        if (index == 0) {
          if (
            histogramData[1].min <= userAveragePace &&
            userAveragePace <= histogramData[0].min + range
          ) {
            setHistogramPaceUserNumber(index);
          }
        } else {
          if (
            Number(item) <= userAveragePace &&
            userAveragePace <= Number(item) + range
          ) {
            setHistogramPaceUserNumber(index);
          }
        }
      });
    }
  }, [histogramPaceLabels, barPaceUserNumber]);

  // 折れ線グラフ　ブレ
  const vw = VwToPx(); //ex. 50 * vw で 50vw と同じ大きさのpxに変換
  const size = 40 * vw;
  const featureData = accelerationStandardDeviation; //データの配列
  const average = averageData?.acceleration_standard_deviation; //平均
  const mainTitle = "力のブレの大きさ -過去と比較-";
  const xSubTitle = "日付";
  const ySubTitle = "力のブレの大きさ(m/s^2)";
  const labels = date; //ラベルの配列
  const chartPropsAccelerationStandardDeviation = {
    figureSize: size,
    featureData: featureData,
    average: average,
    label: {
      mainTitle: mainTitle,
      xSubTitle: xSubTitle,
      ySubTitle: ySubTitle,
      labels: labels,
    },
  };

  // 折れ線グラフ　ペース
  const featureData2 = averagePaces; //データの配列
  const average2 = averageData?.average_pace; //平均
  const mainTitle2 = "平均ペース -過去と比較-";
  const ySubTitle2 = "平均ペース(回/s)";
  const chartPropsAveragePace = {
    figureSize: size,
    featureData: featureData2,
    average: average2,
    label: {
      mainTitle: mainTitle2,
      xSubTitle: xSubTitle,
      ySubTitle: ySubTitle2,
      labels: labels,
    },
  };

  // 棒グラフ　ブレ
  const barChartAccProps = {
    figureSize: size,
    featureData: barAccData,
    label: {
      mainTitle: "力のブレの大きさ -みんなと比較-",
      ySubTitle: "力のブレの大きさ(m/s^2)",
      labels: Array(barAccData.length).fill(""),
    },
    youDataNumber: barAccUserNumber,
    averageDataNumber: barAccAverageNumber,
  };

  // 棒グラフ　ペース
  const barChartPaceProps = {
    figureSize: size,
    featureData: barPaceData,
    label: {
      mainTitle: "平均ペース -みんなと比較-",
      ySubTitle: "一秒間に切った回数(回/s)",
      labels: Array(barPaceData.length).fill(""),
    },
    youDataNumber: barPaceUserNumber,
    averageDataNumber: barPaceAverageNumber,
  };

  // ヒストグラム　ペース
  const HistogramPaceProps = {
    figureSize: size,
    featureData: histogramPaceFeatureData,
    label: {
      mainTitle: "平均ペース -みんなとの比較-",
      xSubTitle: "階級(回/s)",
      ySubTitle: "人数(人)",
      labels: histogramPaceLabels,
    },
    youDataNumber: histogramPaceUserNumber,
  };

  // [...array].reverse()
  // ヒストグラム　ブレ
  const HistogramAccProps = {
    figureSize: size,
    featureData: [...histogramAccFeatureData].reverse(),
    label: {
      mainTitle: "力のブレの大きさ -みんなと比較-",
      xSubTitle: "階級 (m/s^2)",
      ySubTitle: "人数(人)",
      labels: [...histogramAccLabels].reverse(),
    },
    youDataNumber: 9 - histogramAccUserNumber,
  };

  // users配列の中からidがtmpUserIDと一致するユーザーを探す
  const userdisp = users.find((user) => user.id === tmpUserID);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Grid
          container
          spacing={0}
          sx={{
            marginTop: "2vh",
          }}
        >
          <Paper
            sx={{
              p: 4,
              // m: 1,
              // margin: "auto",
              m: "10px auto",
              maxWidth: "90%",
              flexGrow: 1,
            }}
          >
            <div style={{ textAlign: "left" }}>
              id=
              <input
                type="number"
                value={tmpUserID}
                onChange={handleChange}
                placeholder="Enter a number"
                min={1} // 下限
                // max={bestData.length - 1} // 上限
              />
            </div>
            <h2>{userdisp?.name} さんの調理能力結果</h2>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BarChart {...barChartPaceProps} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HistogramVer2 {...HistogramPaceProps} />
            </div>
            <h4>
              {userdisp?.name} さんの「1秒間に切った回数」：
              {bestAveragePace[barPaceUserNumber]?.average_pace}（回/s）
            </h4>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BarChart {...barChartAccProps} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HistogramVer2 {...HistogramAccProps} />
            </div>
            <h4>
              {userdisp?.name} さんの「力のブレの大きさ」：
              {
                bestAccelerationStandardDeviation[barAccUserNumber]
                  ?.acceleration_standard_deviation
              }
              （m/s^2）
            </h4>
            <div>
              <label htmlFor="timePeriod">期間を選択してください: </label>
              <select
                id="timePeriod"
                // value={selectedValue}
                // onChange={handleChange}
              >
                <option value={0}>全期間</option>
                <option value={7}>1週間</option>
                <option value={31}>1ヶ月</option>
                <option value={91}>3ヶ月</option>
                <option value={182}>半年</option>
                <option value={365}>1年</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LineChart {...chartPropsAccelerationStandardDeviation} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LineChart {...chartPropsAveragePace} />
            </div>
          </Paper>
        </Grid>
      </div>
    </>
  );
};

export default Graph;
