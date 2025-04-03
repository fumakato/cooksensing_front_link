//recipe一覧ページ
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Header } from "../../components";

const RecipePage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <p>ここに今まで作ったレシピの一覧を載せる</p>
    </>
  );
};

export default RecipePage;
