//recipe一覧ページ
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Header } from "../../../components";

const EveryonePage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <p>みんなの結果を表示</p>
      <p>〇〇のレシピの概略</p>
      <p>すごい順・新着順・伸び代がある順</p>
      <p>一人分の成績を横並びに表示するコンポーネント作って</p>
      <p>API呼び出しの回数分だけそれを呼び出すコンポーネントも作って</p>
      <p>それをこのページで呼び出すようにしましょう</p>
    </>
  );
};

export default EveryonePage;
