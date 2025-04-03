import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Chart as ChartJS } from "chart.js";

// Chart.jsのグローバル設定を変更
ChartJS.defaults.color = "black"; // デフォルトのテキスト色を青に設定
// ChartJS.defaults.font.family = "'Arial', sans-serif"; // デフォルトのフォントファミリーを設定

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
