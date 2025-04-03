import React from "react";
import axios from "axios";
import dayjs from "dayjs";

const MyComponent = () => {
  const fileList = () => {
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
          // prefix: "/hoge", //みたいな指定も可能
        },
        { headers }
      )
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // axios
    //   .get(`${url}/api/bucket/list`, { headers })
    //   .then((response) => {
    //     console.log("Success:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  const Registration = () => {
    const url = "http://localhost:8080/";

    const now = dayjs();

    axios
      .post(`${url}/api/object/list`, {
        bucket: "cucumber-slices",
        prefix: "",
        // prefix: "/hoge", //みたいな指定も可能
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const FindUserByFirebaseAuthUid = () => {
    const url = "http://localhost:8080/";

    axios
      .post(`${url}users/search_user_by_firebase_auth_uid`, {
        firebase_auth_uid: "aaa",
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const Oresen = () => {
    const url = "http://localhost:8080";

    const now = dayjs();

    axios
      .post(`${url}/users`, {
        Name: "voi",
        // user_id: 1,
        // prefix: "/hoge", //みたいな指定も可能
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const BoGraph = () => {
    const url = "http://localhost:8080";

    axios
      .get(`${url}/best`)
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const OresenById = () => {
    const url = "http://localhost:8080";
    axios
      .post(`${url}/feature_data/byuserid`, {
        user_id: 1,
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div>
        <button onClick={fileList}>fileList</button>
      </div>
      <div>
        <button onClick={Registration}>Registrationt</button>
      </div>
      <div>
        <button onClick={Oresen}>ユーザ登録</button>
      </div>
      <div>
        <button onClick={BoGraph}>棒グラフ</button>
      </div>

      <div>
        <button onClick={FindUserByFirebaseAuthUid}>
          FindUserByFirebaseAuthUid
        </button>
      </div>

      <div>
        <button onClick={OresenById}>折れ線グラフ用データ</button>
      </div>
    </>
  );
  // return (
  //   <div>
  //     <button onClick={handleClick}>Send GET Request</button>
  //   </div>
  // );
};

export default MyComponent;
