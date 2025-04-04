//signin.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const storedId = localStorage.getItem("cooksensing_user_id");
    if (storedId) {
      router.push("/featureGraph");
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
        // "http://localhost:8080/users/search_user_by_name_and_firebase_auth_uid",
        `${apiBaseUrl}/users/search_user_by_name_and_firebase_auth_uid`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, firebase_auth_uid: uid }),
        }
      );

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("cooksensing_user_id", String(user.id));

        router.push("/featureGraph");
      } else {
        const errorData = await response.json();
        alert("ログインに失敗しました");
      }
    } catch (error: any) {
      alert("通信エラーが発生しました: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>サインイン</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          名前:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="fuma"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          パスワード:
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="2025"
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
        サインイン
      </button>

      {/* 登録ページへの案内 */}
      {!isLoggedIn && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p>未登録の方はこちらから</p>
          <button onClick={() => router.push("/signup")}>サインアップ</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
