//本人確認
import React, { ChangeEvent, useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Header } from "../../../components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios, { AxiosError } from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Container from "@mui/material/Container";

interface IdentificationPost {
  userid: string; //=user_ID
  word: string;
}

const Identification: NextPage = () => {
  const router = useRouter();
  const [userURL, setUserURL] = useState("");
  const [userText, setUserText] = useState("");
  const [urlErrorMessage, setUrlErrorMessage] = useState("");
  const [scene, setScene] = useState(0);

  const handleChangeURL = (event: ChangeEvent<HTMLInputElement>) => {
    setUserURL(event.target.value);
  };

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setUserText(event.target.value);
  };

  //こいつはイランかもしれんけど、サインインのときに使えるかもしれんから取っておく
  const onClickSubmit = async () => {
    console.log(userURL);
    if (userURL.startsWith("https://cookpad.com/kitchen/")) {
      console.log("文字列は指定されたパターンで始まっています");
      const pattern = /kitchen\/(\d+)/;
      const match = userURL.match(pattern);
      if (match) {
        const number = match[1]; // 数字部分
        console.log(number); // 54208270
        if (userText != "") {
          startCountdown();
          setScene(1);
          const postdata: IdentificationPost = {
            userid: number,
            word: userText,
          };
          await axios
            .post("http://localhost:3000/certification", postdata)
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setUrlErrorMessage("コメントを入力してください");
        }
      } else {
        setUrlErrorMessage("URLが正しいか確認してください");
      }
    } else {
      setUrlErrorMessage("クックパッドのキッチンのURLを入力してださい");
    }
  };

  const [timeLeft, setTimeLeft] = useState(5); // 5分は300秒

  const startCountdown = () => {
    setTimeLeft(5);
    // ボタンを押したらカウントダウン開始.1分ごとにカウント減らす
    const interval = setInterval(() => {
      setTimeLeft((prevCount: number) => prevCount - 1);
    }, 60000);

    // カウントダウン終了後にタイマーをクリアする
    setTimeout(() => {
      clearInterval(interval);
    }, timeLeft * 60000);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    console.log("1");
    // setOpen(false);
  };
  const handleClose2 = () => {
    console.log("2");
    setOpen(false);
  };
  const handleClose3 = () => {
    console.log("3");
    setOpen(false);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <div>
          {scene === 0 && (
            <>
              <TextField
                id="standard-basic"
                label="MykitchenのURL"
                variant="standard"
                value={userURL}
                onChange={handleChangeURL}
              />
              <br></br>
              <TextField
                id="standard-basic"
                label="送信するつくれぽ"
                variant="standard"
                value={userText}
                onChange={handleChangeText}
              />
              <Button variant="text" onClick={onClickSubmit}>
                本人確認を開始する
              </Button>
              <p>{urlErrorMessage}</p>
            </>
          )}
          {scene === 1 && (
            <>
              <CircularProgress />
              <p>残り時間：約 {timeLeft} 分</p>
              <p>待機中です。「URL」からつくれぽを登録してください</p>

              <p>あなたのつくれぽに登録するコメントは...「{userText}」です</p>

              <Button variant="text" onClick={handleClickOpen}>
                A
              </Button>
              <Button variant="text" onClick={handleClickOpen}>
                B
              </Button>
              <Button variant="text" onClick={handleClickOpen}>
                C
              </Button>
            </>
          )}
          {scene === 2 && (
            <>
              <p>本人確認が完了しました</p>
              <p>本人確認に失敗しました。もう一度お試しください</p>
            </>
          )}
        </div>

        {/* <p
        onClick={async () => {
          router.push({
            // pathname: `/${response.data.id}`, //URL
            pathname: "../../recipe/123/detail",
            // pathname: `/${userid}`,
            // query: { moveId: response.data.id }, //検索クエリ
          });
        }}
      >
        recipeへ飛べるか確認用
      </p> */}
        <Dialog
          open={open}
          onClose={handleClose1}
          // aria-labelledby="alert-dialog-title"
          // aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2}>Disagree</Button>
            <Button onClick={handleClose3} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Identification;
