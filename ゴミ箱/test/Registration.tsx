import React, { useState, useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { red } from "@mui/material/colors";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase_set/firebase";
import { useRouter } from "next/router";

const App: React.FC = () => {
  const router = useRouter();
  const [date, setDate] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>("");
  const [fileurl, setFileurl] = useState<string>("");
  const [fileList, setFileList] = useState<string[]>([]); // List of filenames
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [newID, setNewID] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [uid, setUid] = useState<string>("");
  const [tmpUserID, setIdNumber] = useState<number | "">(0);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("011 Auth State Changed:", user);
      if (typeof user?.uid === "string") {
        setUid(user?.uid);
      }
    });

    const fetchFileList = () => {
      const username = "kajilab";
      const password = "fN4#Xfh4nNa$3T@mhPlv";
      const token = Buffer.from(`${username}:${password}`, "utf8").toString(
        "base64"
      );

      const url = "https://minio-api.kajilab.dev";
      const headers = {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${url}/api/object/list`,
          {
            bucket: "cucumber-slices",
            prefix: "",
          },
          { headers }
        )
        .then((response) => {
          if (Array.isArray(response.data.objects)) {
            setFileList(response.data.objects); // Set the file list
          } else {
            console.error("Response data is not an array:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    fetchFileList();
  }, []);

  // useEffect(() => {
  //   const submitData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/users",

  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       console.log(response);

  //       if (response.status === 200) {
  //         console.log("Data submitted successfully.");
  //       } else {
  //         console.log(`An error occurred: ${response.status}`);
  //       }
  //     } catch (error) {
  //       console.log("An error occurred during submission.");
  //       console.error("Error:", error);
  //     }
  //   };

  //   submitData();
  // }, []);

  //firebaseauthuidを使ってuserIDをとってくる
  const url = "http://localhost:8080";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${url}/users/search_user_by_firebase_auth_uid`,
          {
            firebase_auth_uid: uid,
          }
        ); // 必要なパラメータを指定
        setIdNumber(response.data.id);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [uid]);

  const handleSubmit = async () => {
    if (date == null) {
      setErrorMessage("日付を選択してください");
    } else if (filename == "") {
      setErrorMessage("ファイルを選択してください");
    } else {
      const username = "kajilab";
      const password = "fN4#Xfh4nNa$3T@mhPlv";
      const token = Buffer.from(`${username}:${password}`, "utf8").toString(
        "base64"
      );

      const url = "https://minio-api.kajilab.dev";
      const headers = {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      };

      await axios
        .post(
          `${url}/api/object/get`,
          {
            bucket: "cucumber-slices",
            key: filename,
          },
          { headers }
        )
        .then((response) => {
          if (response.data && typeof response.data.url === "string") {
            setFileurl(response.data.url); // 受け取ったURLを状態に保存
            // console.log(fileurl);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      // // ここから自分のgoサーバ
      // try {
      //   const userResponse = await axios.post("http://localhost:8080/users", {
      //     Name: name,
      //   });
      //   console.log("Success:", userResponse.data.id);

      //   // 1つ目のレスポンスからデータを取得して、2つ目のリクエストに使用
      //   setNewID(userResponse.data.id.toString()); // 例としてレスポンスのIDを取得

      //   // レスポンスのステータスを確認
      //   if (userResponse.status === 200) {
      //     // alert("Data submitted successfully.");
      //   } else {
      //     alert(`An error occurred: ${userResponse.status}`);
      //   }
      // } catch (error) {
      //   // エラーハンドリング
      //   alert("An error occurred during submission.");
      //   console.error("Error:", error);
      // }
    }
  };

  useEffect(() => {
    const uid = String(tmpUserID);
    const submitData = async () => {
      const data = {
        fileurl,
        uid, // tmpUserID,
        date,
      };
      console.log("data");
      console.log(data);

      try {
        const response = await axios.post(
          "http://localhost:8080/feature_data",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);

        if (response.status === 200) {
          alert("Data submitted successfully");
          router.push("/../test/new_postGraph");
        } else {
          alert(`An error occurred: ${response.status}`);
        }
      } catch (error) {
        alert("An error occurred during submission.");
        console.error("Error:", error);
      }
    };

    // newID が空文字列でない場合のみ submitData を呼び出す
    if (fileurl !== "") {
      submitData();
    }
  }, [fileurl]);

  return (
    // <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
    <div style={{ padding: "5vw", maxWidth: "90vw", margin: "auto" }}>
      <h1>データ登録</h1>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <br></br>
      <div style={{ marginBottom: "2vw" }}>
        <p>調理したレシピを選択してください</p>
        <label>
          レシピ:
          <select
            value={filename}
            // onChange={(e) => setFilename(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value={"https://cookpad.com/jp/recipes/24109351"}>
              きゅうりの輪切り by fuma
            </option>
          </select>
        </label>
        <a
          href="https://cookpad.com/jp/recipes/24109351"
          target="_blank"
          rel="noopener noreferrer"
        >
          [レシピを確認する]
        </a>
      </div>
      <br></br>
      <div style={{ marginBottom: "2vw" }}>
        <p>つくれぽを選択してください</p>
        <label>
          つくれぽ:
          <select
            value={filename}
            // onChange={(e) => setFilename(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value={"https://cookpad.com/jp/recipes/24109351"}>
              no data
            </option>
          </select>
        </label>
        <a href="" target="_blank" rel="noopener noreferrer">
          [つくれぽを確認する]
        </a>
      </div>
      <br></br>
      <div style={{ marginBottom: "2vw" }}>
        <p>登録する行動データを選択してください</p>
        <label>
          行動データ:
          <select
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="">Select a file</option>
            {fileList.map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>
        </label>
      </div>
      <br></br>
      <div style={{ marginBottom: "2vw" }}>
        <p>調理した日付を選択してください</p>
        <label>
          調理した日付:
          <input
            type="date"
            value={date ? date : ""}
            onChange={(e) => setDate(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      {/* <br></br> */}
      {/* <div style={{ marginBottom: "2vw" }}>
        <p>つくれぽを選択してください</p>
        <p>--</p>
      </div> */}
      <br></br>
      {/* <div style={{ marginBottom: "2vw" }}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)} // 入力値をstateにセット
          />
        </label>
      </div> */}
      <br></br>
      <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
        Submit POST Request
      </button>
    </div>
  );
};

export default App;
