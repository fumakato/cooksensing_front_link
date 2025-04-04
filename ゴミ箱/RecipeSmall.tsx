//https://mui.com/material-ui/react-grid/
//上記URLにグリッドの使い方載ってる

import axios from "axios";
import React from "react";
import * as CSS from "csstype";
import { useRouter } from "next/router";

import {
  Paper,
  Grid,
  styled,
  Typography,
  ButtonBase,
  Box,
} from "@mui/material";

//コンポーネントの呼び出し元から送られてくる型
interface RecipeSet {
  recipe: Recipe;
}

interface Recipe {
  title: string;
  explanation: string;
  material: string;
  author: string;
  image: string;
  recipe_id?: string;
}

const left: CSS.Properties = {
  textAlign: "left",
};
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

// const recipeListButton: CSS.Properties = {
//   color: "#686652",
//   textAlign: "center",
//   // display: "table-cell",
//   // verticalAlign: "middle",
// };

export const RecipeSmall = ({ recipe }: RecipeSet) => {
  //   const [getData, setGetData] = React.useState<Recipe>(); //ここにGetのデータを入れていく
  const router = useRouter();
  return (
    <>
      <Paper
        sx={{
          p: 2,
          // m: 1,
          // margin: "auto",
          m: "10px auto",
          maxWidth: "95%",
          flexGrow: 1,

          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
        onClick={async () => {
          router.push({
            // pathname: `/${response.data.id}`, //URL
            pathname: "/recipe/123/detail",
            // pathname: `/${userid}`,
            // query: { moveId: response.data.id }, //検索クエリ
          });
        }}
      >
        <Grid container spacing={4} sx={{ p: 2 }}>
          <Grid item xs={4}>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src={recipe.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <div style={left}>
                <Grid item xs wrap="nowrap">
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {recipe.explanation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recipe.material}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    // sx={{ cursor: "pointer" }}
                    variant="body2"
                  >
                    by. {recipe.author}
                  </Typography>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
