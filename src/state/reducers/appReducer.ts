import { AppState } from "../../types";
import { ADD_JOB, EDIT_JOB, DELETE_JOB } from "../actions/jobActions";
import { ADD_CLOCK_ENTRY, EDIT_CLOCK_ENTRY, DELETE_CLOCK_ENTRY, CLOCK_IN_OUT } from "../actions/clockEntryActions";
import { AppAction } from "../actions/appAction";

import {
  handleAddClockEntry,
  handleClockInOut,
  handleDeleteClockEntry,
  handleEditClockEntry,
} from "./clockEntryReducer";
import { handleAddJob, handleDeleteJob, handleEditJob } from "./jobReducer";

// Root reducer that delegates to specialized reducers
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // Job actions
    case ADD_JOB:
      return handleAddJob(state, action);
    case EDIT_JOB:
      return handleEditJob(state, action);
    case DELETE_JOB:
      return handleDeleteJob(state, action);

    // Clock entry actions
    case ADD_CLOCK_ENTRY:
      return handleAddClockEntry(state, action);
    case EDIT_CLOCK_ENTRY:
      return handleEditClockEntry(state, action);
    case DELETE_CLOCK_ENTRY:
      return handleDeleteClockEntry(state, action);
    case CLOCK_IN_OUT:
      return handleClockInOut(state, action);

    default:
      // Use TypeScript to catch unhandled actions at compile time
      //   const _exhaustiveCheck: never = action as never;
      throw new Error();
      return state;
  }
}
