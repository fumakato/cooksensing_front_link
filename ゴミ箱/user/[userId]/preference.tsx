//設定ページ
import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Header } from "../../../components";

const UploadPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Header />
      <p>ユーザ設定</p>
      <p>ここは7月中に作ろう</p>
    </>
  );
};

export default UploadPage;
