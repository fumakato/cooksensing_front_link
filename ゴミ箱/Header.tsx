//ヘッダーのコンポーネント
import axios from "axios";
import React from "react";

import {
  Paper,
  Grid,
  styled,
  Typography,
  ButtonBase,
  Box,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as CSS from "csstype";
import { useRouter } from "next/router";
import logo from "../images/cookteck.png";
import Image from "next/image";

//コンポーネントの呼び出し元から送られてくる型
interface LatestRecipeApiArg {
  user_id?: string;
}

//apiを呼び出して返ってくる値の型
interface RecipeGet {
  recipes: Recipe[];
}
//上のtitlesの中身
interface Recipe {
  title: string;
  explanation: string;
  material: string;
  author: string;
  image: string;
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export const Header = ({
  user_id = "0", //値がなかった場合に入る
}: LatestRecipeApiArg) => {
  const [getData, setGetData] = React.useState<RecipeGet>(); //ここにGetのデータを入れていく
  const router = useRouter();

  const fetch = React.useMemo(async () => {
    // setGetData(tmpdatas);
  }, []);

  React.useEffect(() => {
    fetch;
  }, []);
  const headerUp: CSS.Properties = {
    width: "100%",
    height: "40px",
    // height: "5vh",
    backgroundColor: "white",
    margin: "0,0,0,0",
    padding: "1vh",
    borderBottom: "1.5px solid #dddbd6",
  };

  const headerUnder: CSS.Properties = {
    width: "100%",
    height: "80px",
    // height: "10vh",
    backgroundColor: "white",
    margin: "0,0,0,0",
    padding: "1vh",
    borderBottom: "1.5px solid #dddbd6",
  };

  const headerIn: CSS.Properties = {
    color: "#686652",
    width: "100%",
    height: "100%",
    // backgroundColor: "red", //デバッグ用

    // textAlign: "center",
  };
  const headerInName: CSS.Properties = {
    color: "#686652",
    width: "100%",
    height: "100%",
    // backgroundColor: "red", //デバッグ用
    textAlign: "right",
  };
  const headerSend: CSS.Properties = {
    color: "#fff",
    width: "100%",
    height: "50px",
    backgroundColor: "#8ca307", //デバッグ用
    textAlign: "center",
    paddingTop: "10px",
    // display: "table-cell",
    // verticalAlign: "middle",
    borderRadius: "4px",
  };
  const name = "ふーま";

  return (
    <>
      <div style={headerUp}>
        <Grid container spacing={1} alignItems="center" sx={{ height: "100%" }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <div style={headerIn}>毎日の料理を楽しみにするために分析する</div>
          </Grid>
          <Grid item xs={4.5}>
            <div style={headerInName}>{name}</div>
          </Grid>
          <Grid item xs={0.5}>
            <div style={headerIn}>
              <SettingsIcon
                onClick={async () => {
                  router.push({
                    // pathname: `/${response.data.id}`, //URL
                    pathname: "/user/123/preference",
                    // pathname: `/${userid}`,
                    // query: { moveId: response.data.id }, //検索クエリ
                  });
                }}
              ></SettingsIcon>
            </div>
          </Grid>
          <Grid item xs={2}></Grid> 
        </Grid>
      </div>
      <div style={headerUnder}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={1.8}></Grid>
          <Grid item xs={2.2}>
            <div>
              {/* <div style={headerIn}> */}
              <Image
                src={logo}
                alt="LogoImage"
                width={220}
                onClick={async () => {
                  router.push({
                    // pathname: `/${response.data.id}`, //URL
                    pathname: "/user/123",
                    // pathname: `/${userid}`,
                    // query: { moveId: response.data.id }, //検索クエリ
                  });
                }}
              />
            </div>
          </Grid>
          <Grid item xs={3.5}>
            {/* <div style={headerIn}>検索バー</div> */}
          </Grid>
          <Grid item xs={1.4}></Grid>
          <Grid item xs={1.2}>
            <div
              style={headerSend}
              onClick={async () => {
                router.push({
                  // pathname: `/${response.data.id}`, //URL
                  pathname: "/user/123/uploadSensingData",
                  // pathname: `/${userid}`,
                  // query: { moveId: response.data.id }, //検索クエリ
                });
              }}
            >
              <UploadFileIcon />
              データを送信
            </div>
          </Grid>
          <Grid item xs={1.9}></Grid>
        </Grid>
      </div>
    </>
  );
};
// style= {{background-color:"white"}}
