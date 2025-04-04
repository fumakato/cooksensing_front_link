//userからのグラフページ
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Header } from "../../../components";

const UserGraphPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <p>ここはグラフのページ</p>
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
    </>
  );
};

export default UserGraphPage;
