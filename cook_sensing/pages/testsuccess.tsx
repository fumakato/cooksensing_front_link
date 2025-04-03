import React from "react";
import { useRouter } from "next/router";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

const TestSuccess: React.FC = () => {
  const router = useRouter();

  // ✅ 未ログインなら /register にリダイレクト
  const cooksensing_user_id = useAuthRedirect("/testregister");

  const handleLogout = () => {
    localStorage.removeItem("cooksensing_user_id");
    router.push("/testregister");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>ユーザー登録に成功しました！</h1>
      {cooksensing_user_id ? (
        <p>
          あなたのユーザーID: <strong>{cooksensing_user_id}</strong>
        </p>
      ) : (
        <p>ユーザーIDの取得に失敗しました。</p>
      )}
      <button
        onClick={handleLogout}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        ログアウト
      </button>
    </div>
  );
};

export default TestSuccess;
