import { ClockEntry } from "../../types";

// Define all action types as constants to avoid typos
export const ADD_CLOCK_ENTRY = "ADD_CLOCK_ENTRY";
export const EDIT_CLOCK_ENTRY = "EDIT_CLOCK_ENTRY";
export const DELETE_CLOCK_ENTRY = "DELETE_CLOCK_ENTRY";
export const CLOCK_IN_OUT = "CLOCK_IN_OUT";

// Clock entry actions
export interface AddClockEntryAction {
  type: typeof ADD_CLOCK_ENTRY;
  payload: { jobId: string };
}

export interface EditClockEntryAction {
  type: typeof EDIT_CLOCK_ENTRY;
  payload: ClockEntry;
}

export interface DeleteClockEntryAction {
  type: typeof DELETE_CLOCK_ENTRY;
  payload: string; // entryId
}

export interface ClockInOutAction {
  type: typeof CLOCK_IN_OUT;
  payload: { jobId: string };
}

export type ClockEntryAction =
  | AddClockEntryAction
  | EditClockEntryAction
  | DeleteClockEntryAction
  | ClockInOutAction;

export const addClockEntry = (jobId: string): AddClockEntryAction => ({
  type: ADD_CLOCK_ENTRY,
  payload: { jobId },
});

export const editClockEntry = (
  clockEntry: ClockEntry,
): EditClockEntryAction => ({
  type: EDIT_CLOCK_ENTRY,
  payload: clockEntry,
});

export const deleteClockEntry = (entryId: string): DeleteClockEntryAction => ({
  type: DELETE_CLOCK_ENTRY,
  payload: entryId,
});

export const clockInOut = (jobId: string): ClockInOutAction => ({
  type: CLOCK_IN_OUT,
  payload: { jobId },
});
