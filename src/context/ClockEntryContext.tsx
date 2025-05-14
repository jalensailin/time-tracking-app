import { createContext, useContext } from "react";

import { ClockEntry, ID } from "../types";
import {
  EDIT_CLOCK_ENTRY,
  DELETE_CLOCK_ENTRY,
  CLOCK_IN_OUT,
} from "../state/actions/clockEntryActions";

import { useAppContext } from "../context/AppContext";

interface ClockEntryContextType {
  getClockEntriesForJob: (jobId: ID) => ClockEntry[];
  editClockEntry: (clockEntry: ClockEntry) => void;
  deleteClockEntry: (clockEntryId: ID) => void;
  clockInOut: (jobId: ID) => void;
}

const ClockEntryContext = createContext<ClockEntryContextType | undefined>(
  undefined
);

export const ClockEntryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { state, dispatch } = useAppContext();

  // Helper function to get clock entries for a specific job
  const getClockEntriesForJob = (jobId: ID): ClockEntry[] => {
    const job = state.jobs[jobId];
    if (!job) return [];

    return job.clockEntryIds
      .map((id) => state.clockEntries[id])
      .filter((entry) => entry !== undefined);
  };

  const editClockEntry = (clockEntry: ClockEntry) => {
    dispatch({ type: EDIT_CLOCK_ENTRY, payload: clockEntry });
  };

  const deleteClockEntry = (clockEntryId: ID) => {
    dispatch({ type: DELETE_CLOCK_ENTRY, payload: clockEntryId });
  };

  const clockInOut = (jobId: ID) => {
    dispatch({ type: CLOCK_IN_OUT, payload: { jobId } });
  };

  return (
    <ClockEntryContext.Provider
      value={{
        getClockEntriesForJob,
        editClockEntry,
        deleteClockEntry,
        clockInOut,
      }}
    >
      {children}
    </ClockEntryContext.Provider>
  );
};

export const useClockEntryContext = () => {
  const context = useContext(ClockEntryContext);
  if (!context) {
    throw new Error(
      "useClockEntryContext must be used within a ClockEntryProvider"
    );
  }
  return context;
};
