import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * 指定されたページにリダイレクト（未ログイン時）
 * @param redirectIfNotLoggedIn 未ログイン時の遷移先パス
 * @returns cooksensing_user_id（null or string）
 */
export const useAuthRedirect = (
  redirectIfNotLoggedIn: string
): string | null => {
  const router = useRouter();
  const cooksensing_user_id =
    typeof window !== "undefined"
      ? localStorage.getItem("cooksensing_user_id")
      : null;

  useEffect(() => {
    if (!cooksensing_user_id) {
      router.push(redirectIfNotLoggedIn);
    }
  }, [cooksensing_user_id, redirectIfNotLoggedIn, router]);

  return cooksensing_user_id;
};
