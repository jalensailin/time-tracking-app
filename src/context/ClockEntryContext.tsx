import { createContext, useContext, useMemo } from "react";
import { ClockEntry, Job } from "../types";
import { useAppContext } from "./AppContext";

interface ClockEntryContextType {
  getClockEntriesForJob: (jobId: string) => ClockEntry[];
  editClockEntry: (clockEntry: ClockEntry) => void;
  deleteClockEntry: (clockEntryId: string) => void;
  clockInOut: (jobId: string) => void;
}

const ClockEntryContext = createContext<ClockEntryContextType | undefined>(undefined);

export const ClockEntryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, dispatch } = useAppContext();

  // Helper function to get clock entries for a specific job
  const getClockEntriesForJob = (jobId: string): ClockEntry[] => {
    const job = state.jobs[jobId];
    if (!job) return [];

    return job.clockEntryIds.map((id) => state.clockEntries[id]).filter((entry) => entry !== undefined);
  };

  const editClockEntry = (clockEntry: ClockEntry) => {
    dispatch({ type: "EDIT_CLOCK_ENTRY", payload: clockEntry });
  };

  const deleteClockEntry = (clockEntryId: string) => {
    dispatch({ type: "DELETE_CLOCK_ENTRY", payload: clockEntryId });
  };

  const clockInOut = (jobId: string) => {
    dispatch({ type: "CLOCK_IN_OUT", payload: { jobId } });
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
    throw new Error("useClockEntryContext must be used within a ClockEntryProvider");
  }
  return context;
};
