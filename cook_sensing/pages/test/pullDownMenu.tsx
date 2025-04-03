import React, { useEffect, useState } from "react";
import axios from "axios";

const MyComponent = () => {
  const [options, setOptions] = useState([]); // リストの中身
  const [selectedOption, setSelectedOption] = useState(""); // 選択されたもの

  // API関係の変数定義
  const url = "https://minio-api.kajilab.dev";
  const username = "kajilab";
  const password = "fN4#Xfh4nNa$3T@mhPlv";
  const token = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64"
  );
  const headers = {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };

  // APIからデータを取得する関数
  useEffect(() => {
    // APIにPOSTリクエストを送信してデータを取得する関数
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${url}/api/object/list`,
          {
            bucket: "cucumber-slices",
            prefix: "",
            // prefix: "/hoge", //みたいな指定も可能
          },
          { headers }
        ); // 必要なパラメータを指定
        setOptions(response.data.objects);
        console.log("Success:", response.data);
        console.log("options:", options);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="dropdown">Select an option:</label>
        <select id="dropdown" value={selectedOption} onChange={handleChange}>
          <option value="">Please select</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MyComponent;
