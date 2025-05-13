import { createContext, useContext, useReducer } from "react";
import { AppState, ClockEntry, Job } from "../types";

// Actions that can be dispatched to update state
type AppAction =
  // Job actions
  | { type: "ADD_JOB"; payload: Omit<Job, "id" | "clockEntryIds" | "clockedIn"> }
  | { type: "EDIT_JOB"; payload: Job }
  | { type: "DELETE_JOB"; payload: string } // jobId
  // Clock entry actions
  | { type: "ADD_CLOCK_ENTRY"; payload: { jobId: string } }
  | { type: "EDIT_CLOCK_ENTRY"; payload: ClockEntry }
  | { type: "DELETE_CLOCK_ENTRY"; payload: string } // entryId
  | { type: "CLOCK_IN_OUT"; payload: { jobId: string } };

// Generate a unique ID (in a real app, use a proper UUID library)
const generateId = () => Math.random().toString();

// Initial state. TODO: Load from database.
const initialState: AppState = {
  jobs: {},
  clockEntries: {},
};

// Reducer function to handle all state updates
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_JOB": {
      const id = generateId();
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
    }

    case "EDIT_JOB": {
      const { payload: job } = action;

      return {
        ...state,
        jobs: {
          ...state.jobs,
          [job.id]: job,
        },
      };
    }

    case "DELETE_JOB": {
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
    }

    case "ADD_CLOCK_ENTRY": {
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
    }

    case "EDIT_CLOCK_ENTRY": {
      const { payload: clockEntry } = action;

      return {
        ...state,
        clockEntries: {
          ...state.clockEntries,
          [clockEntry.id]: clockEntry,
        },
      };
    }

    case "DELETE_CLOCK_ENTRY": {
      const entryId = action.payload;
      const newClockEntries = { ...state.clockEntries };
      const deletedEntry = newClockEntries[entryId];
      delete newClockEntries[entryId];

      // Find and update the job that contained this entry
      const newJobs = { ...state.jobs };

      // Note: This is a simple approach. For a larger app, you might want to
      // maintain a reverse index of entryId -> jobId for more efficient lookups
      Object.keys(newJobs).forEach((jobId) => {
        const job = newJobs[jobId];

        if (job.clockEntryIds.includes(entryId)) {
          newJobs[jobId] = {
            ...job,
            clockEntryIds: job.clockEntryIds.filter((id) => id !== entryId),
            // If this was the active entry, update clockedIn status
            clockedIn: job.clockedIn && job.clockEntryIds[job.clockEntryIds.length - 1] !== entryId,
          };
        }
      });

      return {
        ...state,
        jobs: newJobs,
        clockEntries: newClockEntries,
      };
    }

    case "CLOCK_IN_OUT": {
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
    }

    default:
      return state;
  }
}

// Create context with the state and dispatch function
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("`useAppContext()` must be used within the AppProvider.");
  }
  return context;
};
