// types/graph.ts

export interface Option {
  acceleration_standard_deviation: number;
  action_id: number;
  average_pace: number;
  created_at: string;
  date: string;
  deleted_at: string | null;
  id: number;
  updated_at: string;
  user_id: number;
}

export interface AverageData {
  acceleration_standard_deviation: number;
  average_pace: number;
}

export interface UserData {
  acceleration_standard_deviation: number;
  average_pace: number;
  acceleration_std_dev_class: number;
  average_pace_class: number;
  created_at: string;
  deleted_at: string | null;
  updated_at: string;
  user_id: number;
}

export interface HistogramData {
  action_id: number;
  created_at: string;
  deleted_at: string | null;
  display_item_id: number;
  id: number;
  max: number;
  min: number;
  range: number;
  time1: number;
  time2: number;
  time3: number;
  time4: number;
  time5: number;
  time6: number;
  time7: number;
  time8: number;
  time9: number;
  time10: number;
  updated_at: string;
}

export interface HistogramProps {
  figureSize: number;
  featureData: number[];
  label: {
    mainTitle: string;
    xSubTitle: string;
    ySubTitle: string;
    labels: string[];
  };
  youDataNumber: number;
}

export interface UserInfoData {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  tsukurepo_id: string;
  name: string;
  firebase_auth_uid: string;
  is_identification: boolean;
  identity_verification_text: string;
}

export type DateEntry = {
  date: string;
  id: number | null;
};
