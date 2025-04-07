// hooks/useFetchGraphData.ts
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import {
  Option,
  UserData,
  AverageData,
  HistogramData,
  UserInfoData,
} from "../types/graph";

interface UseFetchGraphDataProps {
  cooksensing_user_id: number;
  daysNum: number;
  apiBaseUrl?: string;
  setOptions: Dispatch<SetStateAction<Option[]>>;
  setBestData: Dispatch<SetStateAction<UserData[]>>;
  setAverageData: Dispatch<SetStateAction<AverageData>>;
  setUsers: Dispatch<SetStateAction<UserInfoData[]>>;
  setHistogramData: Dispatch<SetStateAction<HistogramData[]>>;
}

export const fetchGraphData = async ({
  cooksensing_user_id,
  daysNum,
  apiBaseUrl = process.env.NEXT_PUBLIC_API_URL,
  setOptions,
  setBestData,
  setAverageData,
  setUsers,
  setHistogramData,
}: UseFetchGraphDataProps) => {
  try {
    const featureRes = await axios.post(
      `${apiBaseUrl}/feature_data/by_userid_within_days`,
      {
        user_id: cooksensing_user_id,
        days: daysNum,
      }
    );
    setOptions(featureRes.data.data);
  } catch (err) {
    console.error("feature_data error", err);
  }

  try {
    const bestRes = await axios.get(`${apiBaseUrl}/best`);
    setBestData(bestRes.data.data);
  } catch (err) {
    console.error("best error", err);
  }

  try {
    const averageRes = await axios.get(`${apiBaseUrl}/best/average`);
    setAverageData(averageRes.data);
  } catch (err) {
    console.error("average error", err);
  }

  try {
    const usersRes = await axios.get(`${apiBaseUrl}/users`);
    setUsers(usersRes.data.data);
  } catch (err) {
    console.error("users error", err);
  }

  try {
    const histRes = await axios.get(`${apiBaseUrl}/histogram`);
    setHistogramData(histRes.data.data);
  } catch (err) {
    console.error("histogram error", err);
  }
};
