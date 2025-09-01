import React from "react";
import Link from "next/link";

const TestLayoutPage: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>過去にあなたが作ったレシピ</h2>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li>
          <Link href="/test/recipes/curry">カレー</Link>
        </li>
        <li>
          <Link href="/test/recipes/nikujaga">肉じゃが</Link>
        </li>
      </ul>

      <h2 style={{ marginTop: "40px" }}>あなたの調理全ての実力評価</h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li>
          <Link href="/test/evaluation">全ての評価</Link>
        </li>
      </ul>
    </div>
  );
};

export default TestLayoutPage;
