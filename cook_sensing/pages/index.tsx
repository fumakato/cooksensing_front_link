import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/signin"); // サインインページへリダイレクト
  }, [router]);

  return null; // 表示なし
}
