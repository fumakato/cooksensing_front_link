// Reactと各種フック、カスタムフック、コンポーネントのインポート
import React, { useEffect, useState } from "react";
import { useFetchGraphData } from "../hooks/useFetchGraphData"; // グラフ用データを取得するカスタムフック
import { LineChart, VwToPx, HistogramVer2, BarChart } from "../components"; // 表示コンポーネント
import { useChartProps } from "../hooks/useChartProps"; // 各グラフ用のpropsを構築するカスタムフック
import { Paper, Grid } from "@mui/material";
import { useRouter } from "next/router";

// 型のインポート
import {
  Option,
  AverageData,
  UserData,
  HistogramData,
  HistogramProps,
  UserInfoData,
  DateEntry,
} from "../types/graph";

// APIのベースURL（環境変数から取得）
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const Graph: React.FC = () => {
  const router = useRouter();

  // 各種ステート定義（データ取得・加工・表示に関わるもの）
  const [options, setOptions] = useState<Option[]>([]); // 折れ線グラフ用の元データ
  const [date, setDate] = useState<string[]>([]); // 折れ線グラフX軸のラベル（日付）

  // 折れ線グラフのY軸データ（ブレ、ペース）
  const [accelerationStandardDeviation, setAccelerationStandardDeviation] =
    useState<(number | null)[]>([]);
  const [averagePaces, setAveragePaces] = useState<(number | null)[]>([]);

  // 平均データ（全ユーザの平均）
  const [averageData, setAverageData] = useState<AverageData>({
    acceleration_standard_deviation: 0,
    average_pace: 0,
  });

  // 棒グラフに必要なランキングデータ（全ユーザー分）
  const [bestData, setBestData] = useState<UserData[]>([]);
  const [bestAveragePace, setBestAveragePace] = useState<UserData[]>([]);
  const [
    bestAccelerationStandardDeviation,
    setBestAccelerationStandardDeviation,
  ] = useState<UserData[]>([]);

  // 棒グラフでのユーザー自身や平均の順位番号（インデックス）
  const [barAccUserNumber, setBarAccUserNumber] = useState<number>(-1);
  const [barPaceUserNumber, setBarPaceUserNumber] = useState<number>(-1);
  const [barAccAverageNumber, setBarAccAverageNumber] = useState<number>(-1);
  const [barPaceAverageNumber, setBarPaceAverageNumber] = useState<number>(-1);

  // 棒グラフのデータ配列
  const [barAccData, setBarAccData] = useState<number[]>([]);
  const [barPaceData, setBarPaceData] = useState<number[]>([]);

  // ヒストグラム用の元データ（時間別分布）
  const [histogramData, setHistogramData] = useState<HistogramData[]>([]);
  const [histogramAccFeatureData, setHistogramAccFeatureData] = useState<
    number[]
  >([]);
  const [histogramPaceFeatureData, setHistogramPaceFeatureData] = useState<
    number[]
  >([]);
  const [histogramAccLabels, setHistogramAccLabels] = useState<string[]>([]);
  const [histogramPaceLabels, setHistogramPaceLabels] = useState<string[]>([]);

  // ヒストグラム上でのユーザー自身の位置（インデックス）
  const [histogramAccUserNumber, setHistogramAccUserNumber] =
    useState<number>(-1);
  const [histogramPaceUserNumber, setHistogramPaceUserNumber] =
    useState<number>(-1);

  const [daysNum, setDaysNum] = useState<number>(0); // 日数フィルター（折れ線グラフ用）

  // デモ用のユーザーID（localStorageから取得）
  const [cooksensing_user_id, setIdNumber] = useState<number | "">(0);

  const [users, setUsers] = useState<UserInfoData[]>([]); // ユーザー一覧データ

  // ステップ 1: localStorage から ID を取得
  useEffect(() => {
    const storedId = localStorage.getItem("cooksensing_user_id");
    if (storedId) {
      setIdNumber(Number(storedId)); // 文字列→数値に変換してセット
    }
  }, []);

  // ステップ 2: cooksensing_user_id が決まったら API 呼び出し
  useEffect(() => {
    if (typeof cooksensing_user_id === "number" && cooksensing_user_id > 0) {
      // 必要なデータ群をまとめて取得（カスタムフックで管理）
      useFetchGraphData({
        cooksensing_user_id, // ユーザーID（localStorageから取得）
        daysNum, // 対象とする日数（全体 or 絞り込み）
        setOptions, // 折れ線グラフ用データ格納
        setBestData, // 棒グラフ用データ格納（個人）
        setAverageData, // 平均データ格納
        setUsers, // 全ユーザー情報格納
        setHistogramData, // ヒストグラム用データ格納
        apiBaseUrl, // APIのベースURL（.envから取得）
      });
    }
  }, [cooksensing_user_id, daysNum]); // IDまたは日数変更時に再取得

  // 棒グラフデータに「全体平均（ダミーユーザー）」を追加
  useEffect(() => {
    if (
      // acceleration_standard_deviation が0でも有効データなので無視されている
      averageData.average_pace !== 0
    ) {
      if (bestData.length !== 0) {
        const num = bestData.findIndex((item) => item.user_id === -100); // -100はダミーユーザーID
        if (num === -1) {
          const bestAverage: UserData = {
            acceleration_standard_deviation:
              averageData.acceleration_standard_deviation,
            average_pace: averageData.average_pace,
            user_id: -100,
            created_at: "",
            updated_at: "",
            deleted_at: null,
            acceleration_std_dev_class: -1,
            average_pace_class: -1,
          };
          // すでに平均データが含まれていなければ追加
          setBestData([...bestData, bestAverage]);
        }
      }
    }
  }, [averageData, bestData]);

  // bestDataが変更されたときに、並び替えて棒グラフ用の状態を作成
  useEffect(() => {
    const num = bestData.findIndex((item) => item.user_id === -100);
    console.log(bestData);
    if (num !== -1) {
      // ブレ順に降順ソート
      const sortedAccelerationData = [...bestData].sort(
        (a, b) =>
          b.acceleration_standard_deviation - a.acceleration_standard_deviation
      );
      setBestAccelerationStandardDeviation(sortedAccelerationData);

      // ブレ値だけ取り出して配列化 → 棒グラフ用データ
      const accelerationStandardDeviations = sortedAccelerationData.map(
        (item) => item.acceleration_standard_deviation
      );
      setBarAccData(accelerationStandardDeviations);

      // ペース順に昇順ソート
      const sortedPaceData = [...bestData].sort(
        (a, b) => a.average_pace - b.average_pace
      );
      setBestAveragePace(sortedPaceData);

      // ペース値だけ取り出して配列化 → 棒グラフ用データ
      const averagePaces = sortedPaceData.map((item) => item.average_pace);
      setBarPaceData(averagePaces);
    }
  }, [bestData]);

  // 棒グラフ：個人と平均のインデックスを計算（ペース）
  useEffect(() => {
    // 自分のデータの位置を取得
    const index = bestAveragePace.findIndex(
      (item) => item.user_id === cooksensing_user_id
    );
    if (index !== -1) {
      setBarPaceUserNumber(index);
    }

    // 平均（user_id: -100）の位置を取得
    const index2 = bestAveragePace.findIndex((item) => item.user_id === -100);
    if (index2 !== -1) {
      setBarPaceAverageNumber(index2);
    }
  }, [bestAveragePace]);

  // 棒グラフ：個人と平均のインデックスを計算（ブレ）
  useEffect(() => {
    const index3 = bestAccelerationStandardDeviation.findIndex(
      (item) => item.user_id === cooksensing_user_id
    );
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
    }
  }, [histogramData]);

  // ヒストグラム用のユーザの番号算出(ブレ)
  useEffect(() => {
    console.log("テスト");
    console.log(barPaceUserNumber);
    console.log(bestAveragePace[barPaceUserNumber]);
    console.log("=== 自分のbestAveragePaceデータ ===");
    console.dir(bestAveragePace[barPaceUserNumber], { depth: null });
    if (barAccUserNumber !== -1 && histogramAccLabels.length > 0) {
      const userAccelerationStandardDeviation =
        bestAccelerationStandardDeviation[barAccUserNumber]
          .acceleration_standard_deviation;
      const range = histogramData[1].range / 10;
      for (let i = 0; i < histogramAccLabels.length; i++) {
        const lower = Number(histogramAccLabels[i]);
        const upper = lower + range;

        if (
          userAccelerationStandardDeviation >= lower &&
          userAccelerationStandardDeviation <= upper
        ) {
          setHistogramAccUserNumber(i);
          break; // 最初に見つけた階級で確定
        }
      }
    }
  }, [histogramAccLabels, barAccUserNumber]);

  // ヒストグラム用のユーザの番号算出(ペース)
  useEffect(() => {
    // console.log(barPaceUserNumber);
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

  // histogramAccUserNumber が変更されたときのログ
  useEffect(() => {
    if (histogramAccUserNumber !== -1) {
      console.log(
        `ヒストグラム（ブレ）: あなたの階級インデックスが ${histogramAccUserNumber} に設定されました`
      );
    }
  }, [histogramAccUserNumber]);

  // histogramPaceUserNumber が変更されたときのログ
  useEffect(() => {
    if (histogramPaceUserNumber !== -1) {
      console.log(
        `ヒストグラム（ペース）: あなたの階級インデックスが ${histogramPaceUserNumber} に設定されました`
      );
    }
  }, [histogramPaceUserNumber]);

  const {
    chartPropsAveragePace,
    chartPropsAccelerationStandardDeviation,
    barChartAccProps,
    barChartPaceProps,
    HistogramPaceProps,
    HistogramAccProps,
  } = useChartProps({
    averageData,
    date,
    accelerationStandardDeviation,
    averagePaces,
    barAccData,
    barPaceData,
    barAccUserNumber,
    barAccAverageNumber,
    barPaceUserNumber,
    barPaceAverageNumber,
    histogramPaceFeatureData,
    histogramPaceLabels,
    histogramPaceUserNumber,
    histogramAccFeatureData,
    histogramAccLabels,
    histogramAccUserNumber,
  });

  // users配列の中からidがcooksensing_user_idと一致するユーザーを探す
  const userdisp = users.find((user) => user.id === cooksensing_user_id);

  const handleLogout = () => {
    localStorage.removeItem("cooksensing_user_id");
    router.push("/signin");
  };

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
            <div style={{ textAlign: "right" }}>
              <button
                onClick={() => router.push("/dataUpload")}
                style={{ margin: "0.8vw", padding: "0.8vw 1.6vw" }}
              >
                データ登録
              </button>
              <button
                onClick={handleLogout}
                style={{ margin: "0.8vw", padding: "0.8vw 1.6vw" }}
              >
                サインアウト
              </button>
            </div>
            <div>
              <label htmlFor="recipe">レシピを選択してください: </label>
              <select
                id="timePeriod"
                value={daysNum}
                // onChange={handleChangeDays}
              >
                <option value={"https://cookpad.com/jp/recipes/24109351"}>
                  きゅうりの輪切り by fuma
                </option>
              </select>
              <a
                href="https://cookpad.com/jp/recipes/24109351"
                target="_blank"
                rel="noopener noreferrer"
              >
                [レシピを確認する]
              </a>
            </div>

            <br></br>
            <h2>{userdisp?.name} さんの きゅうりの輪切り 調理能力結果</h2>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LineChart {...chartPropsAveragePace} />
            </div>

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
              <LineChart {...chartPropsAccelerationStandardDeviation} />
            </div>
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
          </Paper>
        </Grid>
      </div>
    </>
  );
};

export default Graph;
