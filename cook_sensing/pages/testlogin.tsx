// pages/testlogin.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const storedId = localStorage.getItem("cooksensing_user_id");
    if (storedId) {
      router.push("/testsuccess");
    } else {
      setIsLoggedIn(false); // localStorageにIDがなければ選択肢を表示
    }
  }, [router]);

  const handleLogin = async () => {
    if (!name || !uid) {
      alert("名前とUIDの両方を入力してください");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/users/search_user_by_name_and_firebase_auth_uid",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, firebase_auth_uid: uid }),
        }
      );

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("cooksensing_user_id", String(user.id));
        alert(`ログイン成功：ID=${user.id}`);
        router.push("/testsuccess");
      } else {
        const errorData = await response.json();
        alert(`ログイン失敗: ${errorData.error}`);
      }
    } catch (error: any) {
      alert("通信エラーが発生しました: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>ログイン</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          名前:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Taro"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          UID（テスト用）:
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="uid-123456"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
        ログイン
      </button>

      {/* 登録ページへの案内 */}
      {!isLoggedIn && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p>未登録の方はこちらから</p>
          <button onClick={() => router.push("/testregister")}>
            ユーザー登録へ
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
