import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Navigation params. These must be `type`s and not `interface`s
export type RootStackParamList = {
  "Job Management": undefined;
  "Edit Job": { id?: string };
  ClockHistory: { jobId: string };
};

export type JobMgmtProps = NativeStackScreenProps<RootStackParamList, "Job Management">;
export type EditProps = NativeStackScreenProps<RootStackParamList, "Edit Job">;
export type ClockHistoryProps = NativeStackScreenProps<RootStackParamList, "ClockHistory">;

export interface ClockIn {
  start: Date;
  end?: Date;
}

export interface Job {
  id: string;
  name: string;
  client?: string;
  basePayRate: number;
  clockedIn: boolean;
  clockIns: ClockIn[];
}
