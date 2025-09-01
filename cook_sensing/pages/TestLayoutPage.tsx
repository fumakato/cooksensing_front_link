import React from "react";
import Link from "next/link";

const TestLayoutPage: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>過去にあなたが作ったレシピ</h2>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        <li style={{ marginBottom: "8px" }}>
          <Link href="/recipes/curry" passHref>
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              カレー
            </span>
          </Link>
        </li>
        <li>
          <Link href="/recipes/nikujaga" passHref>
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              肉じゃが
            </span>
          </Link>
        </li>
      </ul>

      <h2 style={{ marginTop: "40px" }}>あなたの調理全ての実力</h2>
      {/* 実力を可視化する要素は今後追加 */}
    </div>
  );
};

export default TestLayoutPage;
