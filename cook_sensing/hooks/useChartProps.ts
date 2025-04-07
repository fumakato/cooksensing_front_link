import { VwToPx } from "../components";
import { AverageData } from "../types/graph";

export const useChartProps = ({
  averageData,
  date,
  accelerationStandardDeviation,
  averagePaces,
  barAccData,
  barPaceData,
  barAccUserNumber,
  barAccAverageNumber,
  barPaceUserNumber,
  barPaceAverageNumber,
  histogramPaceFeatureData,
  histogramPaceLabels,
  histogramPaceUserNumber,
  histogramAccFeatureData,
  histogramAccLabels,
  histogramAccUserNumber,
}: {
  averageData: AverageData;
  date: string[];
  accelerationStandardDeviation: (number | null)[];
  averagePaces: (number | null)[];
  barAccData: number[];
  barPaceData: number[];
  barAccUserNumber: number;
  barAccAverageNumber: number;
  barPaceUserNumber: number;
  barPaceAverageNumber: number;
  histogramPaceFeatureData: number[];
  histogramPaceLabels: string[];
  histogramPaceUserNumber: number;
  histogramAccFeatureData: number[];
  histogramAccLabels: string[];
  histogramAccUserNumber: number;
}) => {
  const vw = VwToPx();
  const size = 40 * vw;

  const chartPropsAveragePace = {
    figureSize: size,
    featureData: averagePaces,
    average: averageData.average_pace,
    label: {
      mainTitle: "平均ペース -過去と比較-",
      xSubTitle: "日付",
      ySubTitle: "平均ペース(回/s)",
      labels: date,
    },
  };

  const chartPropsAccelerationStandardDeviation = {
    figureSize: size,
    featureData: accelerationStandardDeviation,
    average: averageData.acceleration_standard_deviation,
    label: {
      mainTitle: "力のブレの大きさ -過去と比較-",
      xSubTitle: "日付",
      ySubTitle: "力のブレの大きさ(m/s^2)",
      labels: date,
    },
  };

  const barChartPaceProps = {
    figureSize: size,
    featureData: barPaceData,
    label: {
      mainTitle: "平均ペース -みんなと比較-",
      ySubTitle: "一秒間に切った回数(回/s)",
      labels: Array(barPaceData.length).fill(""),
    },
    youDataNumber: barPaceUserNumber,
    averageDataNumber: barPaceAverageNumber,
  };

  const barChartAccProps = {
    figureSize: size,
    featureData: barAccData,
    label: {
      mainTitle: "力のブレの大きさ -みんなと比較-",
      ySubTitle: "力のブレの大きさ(m/s^2)",
      labels: Array(barAccData.length).fill(""),
    },
    youDataNumber: barAccUserNumber,
    averageDataNumber: barAccAverageNumber,
  };

  const HistogramPaceProps = {
    figureSize: size,
    featureData: histogramPaceFeatureData,
    label: {
      mainTitle: "平均ペース -みんなとの比較-",
      xSubTitle: "階級(回/s)",
      ySubTitle: "人数(人)",
      labels: histogramPaceLabels,
    },
    youDataNumber: histogramPaceUserNumber,
  };

  const HistogramAccProps = {
    figureSize: size,
    featureData: [...histogramAccFeatureData].reverse(),
    label: {
      mainTitle: "力のブレの大きさ -みんなと比較-",
      xSubTitle: "階級 (m/s^2)",
      ySubTitle: "人数(人)",
      labels: [...histogramAccLabels].reverse(),
    },
    youDataNumber: 9 - histogramAccUserNumber,
  };

  return {
    chartPropsAveragePace,
    chartPropsAccelerationStandardDeviation,
    barChartAccProps,
    barChartPaceProps,
    HistogramPaceProps,
    HistogramAccProps,
  };
};
