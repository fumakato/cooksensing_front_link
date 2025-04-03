import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface TsukurepoReturn {
  date: string;
  message: string;
  tsukurepo_id: string;
  tsukurepo_image: string;
  recipe_image: string;
  recipe_title: string;
}
interface TsukurepoList {
  tsukurepo: TsukurepoReturn[];
}

interface Props {
  tsukurepos: TsukurepoList;
  onChildValue: (arg: string) => void;
}

export const TsukurepoLatestList = ({ tsukurepos, onChildValue }: Props) => {
  const tsukurepo = tsukurepos.tsukurepo;
  const [selectedValue, setSelectedValue] = React.useState("");

  const handlePaperClick = (value: string) => {
    setSelectedValue(value);
    onChildValue(value);
  };

  return (
    <>
      <Grid container spacing={0}>
        {tsukurepo.map((item, index) => (
          <>
            <Grid item xs={6}>
              <Paper
                key={index}
                elevation={3}
                style={{
                  // aline: "center",
                  width: "90%",
                  padding: "2%",
                  margin: "auto",
                  marginBottom: "3%",
                  cursor: "pointer",
                  backgroundColor:
                    selectedValue === item.tsukurepo_id ? "#e0e0e0" : "#ffffff",
                }}
                onClick={() => handlePaperClick(item.tsukurepo_id)}
              >
                <Grid container spacing={5}>
                  <Grid item xs={3}>
                    <img
                      src={item.recipe_image}
                      // height="100%"
                      width="100%"
                    ></img>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant="caption" display="block" gutterBottom>
                      {item.date} 投稿
                    </Typography>
                    <Typography variant="caption" display="block">
                      レシピ名
                    </Typography>
                    <Typography variant="h6" display="block" gutterBottom>
                      {item.recipe_title}
                    </Typography>
                    <Typography variant="caption" display="block">
                      あなたのコメント
                    </Typography>
                    <Typography variant="body1" display="block" gutterBottom>
                      {item.message}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

// export default Component;

// Material-UIのTypographyコンポーネント（一部
// variant: テキストのバリエーションを指定します。例えば、"h1"や"body1"などがあります。
// color: テキストの色を指定します。
// align: テキストの水平方向の配置を指定します。
// display: テキストをブロック要素として扱うか、インライン要素として扱うかを指定します。
// gutterBottom: 下側にマージンを追加します。
// noWrap: テキストの折り返しを制御します。
// paragraph: テキストを段落として表示するかどうかを指定します。

// Typography:displayプロパティにはさまざまな値を指定することができ、要素の表示方法を制御するために使用されます。以下に一部を示します。
// block: ブロックレベル要素として表示されます。新しい行で表示され、横幅は親要素の幅いっぱいを占有します。
// inline: インライン要素として表示されます。要素は同じ行内に表示され、横幅は要素の内容に合わせられます。
// inline-block: インラインブロック要素として表示されます。インライン要素のように行内に表示されますが、ブロック要素のように高さと幅を持ちます。
// none: 要素を非表示にします。文書のレイアウトから要素が取り除かれます。
// flex: 要素をフレックスコンテナーとして表示します。子要素をフレックスアイテムとして配置することができるようになります。
// grid: 要素をグリッドコンテナーとして表示します。子要素をグリッドアイテムとして配置することができるようになります。
