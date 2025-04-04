import React from "react";

// 構造体の型を定義
type InputData = {
  date: string;
  id: number;
  // 他のプロパティも含める場合、ここに追加
};

type DateEntry = {
  date: string;
  id: number | null;
};

const DateFiller: React.FC = () => {
  const fillDates = (data: InputData[]): DateEntry[] => {
    // dateプロパティのみをDateオブジェクトに変換して配列に格納
    const dateObjects = data.map((item) => {
      const date = new Date(item.date); // ISO形式の文字列をDateオブジェクトに変換
      return { original: item.date, date, id: item.id };
    });

    // 昇順でソート
    dateObjects.sort((a, b) => a.date.getTime() - b.date.getTime());

    // 最古と最新の日付のみに注目
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

  // 使用例
  const inputData = [
    {
      id: 3,
      date: "2023-01-29T12:31:00+09:00",
      acceleration_standard_deviation: 4.9175,
      action_id: 1,
      average_pace: 0.8356,
      created_at: "2024-09-26T15:26:43.394+09:00",
      deleted_at: null,
      updated_at: "2024-09-26T15:26:43.394+09:00",
      user_id: 2,
    },
    {
      id: 4,
      date: "2023-01-29T17:51:00+09:00",
      acceleration_standard_deviation: 7.0567,
      action_id: 1,
      average_pace: 1.0895,
      created_at: "2024-09-26T15:26:43.395+09:00",
      deleted_at: null,
      updated_at: "2024-09-26T15:26:43.395+09:00",
      user_id: 2,
    },
    {
      id: 5,
      date: "2023-02-02T15:00:00+09:00",
      acceleration_standard_deviation: 5.23,
      action_id: 1,
      average_pace: 0.92,
      created_at: "2024-09-26T15:26:43.396+09:00",
      deleted_at: null,
      updated_at: "2024-09-26T15:26:43.396+09:00",
      user_id: 2,
    },
  ];

  const filledDates = fillDates(inputData);

  return (
    <div>
      <h1>Filled Dates</h1>
      <ul>
        {filledDates.map((entry, index) => (
          <li key={index}>
            {entry.date} - ID: {entry.id !== null ? entry.id : "null"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DateFiller;
