import { AppState, ClockEntry } from "../../types";
import {
  AddClockEntryAction,
  EditClockEntryAction,
  DeleteClockEntryAction,
  ClockInOutAction,
} from "../actions/clockEntryActions";

function generateId() {
  return Math.random().toString();
}

// Clock entry-related reducers
export const handleAddClockEntry = (
  state: AppState,
  action: AddClockEntryAction,
): AppState => {
  const { jobId } = action.payload;
  const job = state.jobs[jobId];

  if (!job) return state;

  const id = generateId();
  const newClockEntry: ClockEntry = {
    id,
    start: new Date(),
    tagIds: [],
  };

  return {
    ...state,
    // Add new clock entry
    clockEntries: {
      ...state.clockEntries,
      [id]: newClockEntry,
    },
    // Update job with reference to new entry
    jobs: {
      ...state.jobs,
      [jobId]: {
        ...job,
        clockEntryIds: [...job.clockEntryIds, id],
        clockedIn: true,
      },
    },
  };
};

export const handleEditClockEntry = (
  state: AppState,
  action: EditClockEntryAction,
): AppState => {
  const { payload: clockEntry } = action;

  return {
    ...state,
    clockEntries: {
      ...state.clockEntries,
      [clockEntry.id]: clockEntry,
    },
  };
};

export const handleDeleteClockEntry = (
  state: AppState,
  action: DeleteClockEntryAction,
): AppState => {
  const entryId = action.payload;
  const newClockEntries = { ...state.clockEntries };
  delete newClockEntries[entryId];

  // Find and update the job that contained this entry
  const newJobs = { ...state.jobs };

  // For a larger app, you might want to maintain a reverse index of entryId -> jobId
  // for more efficient lookups
  Object.keys(newJobs).forEach((jobId) => {
    const job = newJobs[jobId];

    if (job.clockEntryIds.includes(entryId)) {
      newJobs[jobId] = {
        ...job,
        clockEntryIds: job.clockEntryIds.filter((id) => id !== entryId),
        // If this was the active entry, update clockedIn status
        clockedIn:
          job.clockedIn &&
          job.clockEntryIds[job.clockEntryIds.length - 1] !== entryId,
      };
    }
  });

  return {
    ...state,
    jobs: newJobs,
    clockEntries: newClockEntries,
  };
};

export const handleClockInOut = (
  state: AppState,
  action: ClockInOutAction,
): AppState => {
  const { jobId } = action.payload;
  const job = state.jobs[jobId];

  if (!job) return state;

  if (!job.clockedIn) {
    // Clock in: Create a new entry
    const entryId = generateId();
    const newEntry: ClockEntry = {
      id: entryId,
      start: new Date(),
      tagIds: [],
    };

    return {
      ...state,
      clockEntries: {
        ...state.clockEntries,
        [entryId]: newEntry,
      },
      jobs: {
        ...state.jobs,
        [jobId]: {
          ...job,
          clockEntryIds: [...job.clockEntryIds, entryId],
          clockedIn: true,
        },
      },
    };
  } else {
    // Clock out: Complete the last entry
    const lastEntryId = job.clockEntryIds[job.clockEntryIds.length - 1];
    const lastEntry = state.clockEntries[lastEntryId];

    if (!lastEntry) return state;

    return {
      ...state,
      clockEntries: {
        ...state.clockEntries,
        [lastEntryId]: {
          ...lastEntry,
          end: new Date(),
        },
      },
      jobs: {
        ...state.jobs,
        [jobId]: {
          ...job,
          clockedIn: false,
        },
      },
    };
  }
};
