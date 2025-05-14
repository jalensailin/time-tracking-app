import { Job, ID } from "../../types";

// Define all action types as constants to avoid typos
export const ADD_JOB = "ADD_JOB";
export const EDIT_JOB = "EDIT_JOB";
export const DELETE_JOB = "DELETE_JOB";

export type NewJobData = Omit<Job, "id" | "clockEntryIds" | "clockedIn">;

// Job actions
export interface AddJobAction {
  type: typeof ADD_JOB;
  payload: NewJobData;
}

export interface EditJobAction {
  type: typeof EDIT_JOB;
  payload: Job;
}

export interface DeleteJobAction {
  type: typeof DELETE_JOB;
  payload: ID; // jobId
}

// Union type of Job Actions.
export type JobAction = AddJobAction | EditJobAction | DeleteJobAction;
