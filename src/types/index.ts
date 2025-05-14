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

export type JobMgmtProps = NativeStackScreenProps<
  RootStackParamList,
  "Job Management"
>;
export type EditProps = NativeStackScreenProps<RootStackParamList, "Edit Job">;
export type ClockHistoryProps = NativeStackScreenProps<
  RootStackParamList,
  "ClockHistory"
>;

/* -------------------------------------------------------------------------- */

/** Some ID */
export type ID = string;

export interface AppState {
  jobs: Record<ID, Job>;
  clockEntries: Record<ID, ClockEntry>;
  // tags: Record<string, Tag>;
}

export interface Job {
  id: ID;
  name: string;
  client?: string;
  basePayRate: number;
  clockedIn: boolean;
  clockEntryIds: ID[];
}

export interface ClockEntry {
  id: ID;
  start: Date;
  end?: Date;
  tagIds: ID[];
}

// Future: Tag interface
// export interface Tag {
//   id: ID;
//   name: string;
//   color: string;
//   // Add more custom fields as needed
// }
