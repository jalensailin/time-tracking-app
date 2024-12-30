import { NativeStackScreenProps } from "@react-navigation/native-stack";

// Navigation params. These must be `type`s and not `interface`s
export type RootStackParamList = {
  "Job Management": undefined;
  "Edit Job": { mode: "edit" | "add"; job?: Job; addJob: (job: Job) => void };
};

export type JobMgmtProps = NativeStackScreenProps<RootStackParamList, "Job Management">;
export type EditProps = NativeStackScreenProps<RootStackParamList, "Edit Job">;

export interface Job {
  id: string;
  name: string;
  client?: string;
  basePayRate: number;
}
