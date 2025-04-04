import axios, { AxiosError } from "axios";
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, ChangeEvent, useEffect } from "react";

interface PostData {
  user_id: number;
  name?: string;
  image?: string;
  firebase_uid?: string;
}

const Graph: React.FC = () => {
  const apiUrl = "http://localhost:3000/users";

  const onClickSubmit = async () => {
    const postData: PostData = {
      user_id: 12331,
      // name: "aaa",
      firebase_uid: "nbft678ikjhg",
    };

    await axios
      .post(`${apiUrl}`, postData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  };

  const onClickSubmit2 = async () => {
    const postData: PostData = {
      user_id: 123456789,
      name: "ooo",
      image: "http://",
    };

    await axios
      .put(`${apiUrl}`, postData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  };

  interface Uid {
    uid: string;
  }
  const onClickSubmit3 = async () => {
    const uid: string = "sTueiaE6ciWhSsF7uKpzaXOF8nT2";
    const fire_uid: Uid = {
      uid: uid,
    };
    await axios
      .post(`${apiUrl}/firebase`, fire_uid)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  };

  const onClickSubmit4 = async () => {
    // const postData: PostData = {
    //   user_id: 123,
    //   name: "aaa",
    // };
    const id = "123";
    await axios
      .get(`${apiUrl}/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.user_id);
      })
      .catch((e: AxiosError) => {
        console.error(e);
      });
  };

  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("変更なし");
  const handleChangeMail = (event: ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };
  const handleChangePass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("kawattayo!!");
  };

  return (
    <>
      <input type="button" value="登録" onClick={onClickSubmit} />
      <input type="button" value="更新" onClick={onClickSubmit2} />
      <input
        type="button"
        value="ファイヤーベース用のPOST"
        onClick={onClickSubmit3}
      />
      <input type="button" value="ユーザ検索" onClick={onClickSubmit4} />
      <p>テステス</p>
      <form onSubmit={handleSubmit}>
        <TextField
          type="mail"
          label="メールアドレス"
          variant="standard"
          value={mail}
          fullWidth
          required
          onChange={handleChangeMail}
        />
        <TextField
          type="password"
          label="パスワード"
          variant="standard"
          value={pass}
          fullWidth
          required
          onChange={handleChangePass}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ marginBottom: "10%" }}
          // onClick={handleSubmit}
        >
          サインイン
        </Button>
      </form>
      <p>{message}</p>
    </>
  );
};

export default Graph;
