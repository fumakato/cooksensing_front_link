//https://mui.com/material-ui/react-grid/
//上記URLにグリッドの使い方載ってる

import axios from "axios";
import React from "react";
import * as CSS from "csstype";

import {
  Paper,
  Grid,
  styled,
  Typography,
  ButtonBase,
  Box,
} from "@mui/material";
import { RecipeSmall } from "./";
import { useRouter } from "next/router";

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

const recipeListButton: CSS.Properties = {
  color: "#686652",
  textAlign: "center",
  // display: "table-cell",
  // verticalAlign: "middle",
};
const tmpdata1: Recipe = {
  title: "うちのカレー",
  explanation: "家で作ってたカレーです",
  author: "ゴリラ",
  material:
    "パルメザンチーズ、ズッキーニ、にら、らっきょう、ういろう、うづらのたまご、ごま",
  image:
    "https://img.cpcdn.com/recipes/7543426/894x1461s/03789cbf29381cf7fa6857ee07177ee1?u=52069349&p=1689583076",
};
const tmpdata2: Recipe = {
  title: "きのこの煮込みハンバーグ",
  explanation: "ケチャップとウスターソースでかんたん煮込み",
  author: "✞✟✞おこめ✟✞✟",
  material: "玉ねぎ",
  image:
    "https://img.cpcdn.com/recipes/7568811/m/926d7ee2bbbad58e16a2d124c28bbadd?u=14685394&p=1688220140",
};
const tmpdata3: Recipe = {
  title: "トントンかつ",
  explanation: "fooooooo",
  author: "紫陽花",
  material: "材料",
  image:
    "https://img.cpcdn.com/recipes/7574224/894x1461s/8c44d33cde03f21a38acfe162a0401ef?u=41499908&p=1688871936",
};

const tmpdatas: RecipeGet = {
  recipes: [tmpdata1, tmpdata2, tmpdata3],
};

export const MadeLatestRecipe = ({
  user_id = "0", //値がなかった場合に入る
}: LatestRecipeApiArg) => {
  const [getData, setGetData] = React.useState<RecipeGet>(); //ここにGetのデータを入れていく
  const router = useRouter();

  //   const url = `http://localhost:3000/recipe/latest/${user_id}`;
  //   const fetch = React.useMemo(async () => {
  //     const { data } = await axios.get<RecipeGet>(url);
  //     //上記{data}はdataという値から取ってきているため、他の名前で宣言できないっぽい
  //     setGetData(data);
  //   }, []);

  //   React.useEffect(() => {
  //     fetch;
  //   }, []);

  //   const text = getData?.recipes[0].title;

  const fetch = React.useMemo(async () => {
    setGetData(tmpdatas);
  }, []);

  React.useEffect(() => {
    fetch;
  }, []);

  if (getData !== undefined) {
    return (
      <>
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
          <h2 style={{ textAlign: "center" }}>最近作ったレシピ</h2>
          {(() => {
            const items = [];
            for (let i = 0; i < getData?.recipes.length; i++) {
              items.push(
                <div>
                  <RecipeSmall recipe={getData.recipes[i]} />
                </div>
              );
            }
            return <div>{items}</div>;
          })()}

          <Paper
            sx={{
              p: 2,
              // m: 1,
              // margin: "auto",
              m: "25px auto auto auto",
              maxWidth: 500,
              flexGrow: 1,
            }}
            onClick={async () => {
              router.push({
                // pathname: `/${response.data.id}`, //URL
                pathname: "/recipe",
                // pathname: `/${userid}`,
                // query: { moveId: response.data.id }, //検索クエリ
              });
            }}
          >
            <div style={recipeListButton}>全ての一覧を表示</div>
          </Paper>
        </Paper>
      </>
    );
  } else {
    return <></>;
  }
};
