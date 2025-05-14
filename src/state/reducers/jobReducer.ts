import { AppState, Job } from "../../types";
import {
  AddJobAction,
  DeleteJobAction,
  EditJobAction,
} from "../actions/jobActions";

// Job-related reducers
export const handleAddJob = (
  state: AppState,
  action: AddJobAction,
): AppState => {
  const id = Math.random().toString();
  const newJob: Job = {
    ...action.payload,
    id,
    clockEntryIds: [],
    clockedIn: false,
  };

  return {
    ...state,
    jobs: {
      ...state.jobs,
      [id]: newJob,
    },
  };
};

export const handleEditJob = (
  state: AppState,
  action: EditJobAction,
): AppState => {
  const { payload: job } = action;

  return {
    ...state,
    jobs: {
      ...state.jobs,
      [job.id]: job,
    },
  };
};

export const handleDeleteJob = (
  state: AppState,
  action: DeleteJobAction,
): AppState => {
  const jobId = action.payload;
  const newJobs = { ...state.jobs };
  delete newJobs[jobId];

  // Also clean up any associated clock entries
  const job = state.jobs[jobId];
  const newClockEntries = { ...state.clockEntries };

  if (job) {
    job.clockEntryIds.forEach((entryId) => {
      delete newClockEntries[entryId];
    });
  }

  return {
    ...state,
    jobs: newJobs,
    clockEntries: newClockEntries,
  };
};
