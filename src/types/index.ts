import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Navigation params. These must be `type`s and not `interface`s
export type RootStackParamList = {
  "Job Management": undefined;
  "Edit Job": { id?: string };
};

export type JobMgmtProps = NativeStackScreenProps<RootStackParamList, "Job Management">;
export type EditProps = NativeStackScreenProps<RootStackParamList, "Edit Job">;

export interface Job {
  id: string;
  name: string;
  client?: string;
  basePayRate: number;
}
