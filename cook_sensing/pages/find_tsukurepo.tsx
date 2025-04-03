import React, { useState } from "react";

const TextInputForm = () => {
  // テキスト入力の状態を管理するためのstateを定義
  const [inputValue, setInputValue] = useState("");

  // テキスト入力の値が変更された際に実行されるハンドラ関数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // フォームの送信ハンドラ関数
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // フォームのデータを取得する処理をここに追加
    console.log("入力された値:", inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleChange} />
      <button type="submit">送信</button>
    </form>
  );
};

export default TextInputForm;
