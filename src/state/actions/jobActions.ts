import { Job } from "../../types";

// Define all action types as constants to avoid typos
export const ADD_JOB = "ADD_JOB";
export const EDIT_JOB = "EDIT_JOB";
export const DELETE_JOB = "DELETE_JOB";

// Job actions
export interface AddJobAction {
  type: typeof ADD_JOB;
  payload: Omit<Job, "id" | "clockEntryIds" | "clockedIn">;
}

export interface EditJobAction {
  type: typeof EDIT_JOB;
  payload: Job;
}

export interface DeleteJobAction {
  type: typeof DELETE_JOB;
  payload: string; // jobId
}

// Union type of all possible actions
export type JobAction = AddJobAction | EditJobAction | DeleteJobAction;

// Action creators
export const addJob = (jobData: Omit<Job, "id" | "clockEntryIds" | "clockedIn">): AddJobAction => ({
  type: ADD_JOB,
  payload: jobData,
});

export const editJob = (job: Job): EditJobAction => ({
  type: EDIT_JOB,
  payload: job,
});

export const deleteJob = (jobId: string): DeleteJobAction => ({
  type: DELETE_JOB,
  payload: jobId,
});
