import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TestRegister: React.FC = () => {
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
      setIsLoggedIn(false);
    }
  }, [router]);

  const handleCreateUser = async () => {
    if (!name || !uid) {
      alert("名前とUIDの両方を入力してください");
      return;
    }

    try {
      const response = await fetch(
        // "http://localhost:8080/users",
        `${apiBaseUrl}/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, firebase_auth_uid: uid }),
        }
      );

      const data: { id?: number; error?: string } = await response.json();

      if (response.ok && data.id) {
        localStorage.setItem("cooksensing_user_id", String(data.id));
        alert("ユーザー登録に成功しました");
        router.push("/featureGraph");
      } else {
        alert(`エラー: ${data.error ?? "Unknown error"}`);
      }
    } catch (error: any) {
      alert("通信エラーが発生しました: " + error.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>サインアップ</h2>

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

      <button onClick={handleCreateUser} style={{ padding: "10px 20px" }}>
        サインアップ
      </button>

      {/* ログインページへの案内 */}
      {!isLoggedIn && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <p>すでに登録済みの方はこちら</p>
          <button onClick={() => router.push("/signin")}>サインイン</button>
        </div>
      )}
    </div>
  );
};

export default TestRegister;
