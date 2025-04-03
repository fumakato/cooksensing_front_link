//その人が過去に作ったレシピページ

import React from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const UserRecipePage: NextPage = () => {
  const router = useRouter();

  return (
    
    <div style={{ textAlign: "center" }}>
      <p>〇〇さんの作ったレシピ</p>
      <p>1.</p>
      <p>2.</p>
      <p>3.</p>
      <p>4.</p>
      <p>5.</p>
    </div>
  );
};

export default UserRecipePage;
