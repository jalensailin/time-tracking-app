import { ClockEntry, ID } from "../../types";

// Define all action types as constants to avoid typos
export const ADD_CLOCK_ENTRY = "ADD_CLOCK_ENTRY";
export const EDIT_CLOCK_ENTRY = "EDIT_CLOCK_ENTRY";
export const DELETE_CLOCK_ENTRY = "DELETE_CLOCK_ENTRY";
export const CLOCK_IN_OUT = "CLOCK_IN_OUT";

// Clock entry actions
export interface AddClockEntryAction {
  type: typeof ADD_CLOCK_ENTRY;
  payload: { jobId: ID };
}

export interface EditClockEntryAction {
  type: typeof EDIT_CLOCK_ENTRY;
  payload: ClockEntry;
}

export interface DeleteClockEntryAction {
  type: typeof DELETE_CLOCK_ENTRY;
  payload: ID; // entryId
}

export interface ClockInOutAction {
  type: typeof CLOCK_IN_OUT;
  payload: { jobId: ID };
}

export type ClockEntryAction =
  | AddClockEntryAction
  | EditClockEntryAction
  | DeleteClockEntryAction
  | ClockInOutAction;
