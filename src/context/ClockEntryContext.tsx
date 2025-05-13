import React, { createContext, useContext, useState } from "react";

import { ClockEntry, Job } from "../types";

import { useAppContext } from "./AppContext";
import { useJobContext } from "./JobContext";

interface ClockEntryContextType {
  editClockEntry: (clockEntry: ClockEntry) => void;
  deleteClockEntry: (clockEntryId: string) => void;
  clockInOut: (job: Job) => void;
}

const ClockEntryContext = createContext<ClockEntryContextType | undefined>(undefined);

export const ClockEntryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { clockEntries, setClockEntries } = useAppContext();
  const { editJob } = useJobContext();

  const addClockEntry = (job: Job) => {
    const newId = Math.random().toString();
    const newClockEntry = { id: newId, start: new Date(), tagIds: [] };

    setClockEntries([...clockEntries, newClockEntry]);
    editJob({ ...job, clockEntryIds: [...job.clockEntryIds, newId], clockedIn: true });
  };

  const editClockEntry: ClockEntryContextType["editClockEntry"] = (newEntry) => {
    setClockEntries((prevClockEntries) =>
      prevClockEntries.map((oldEntry) => (oldEntry.id === newEntry.id ? newEntry : oldEntry))
    );
  };

  const deleteClockEntry: ClockEntryContextType["deleteClockEntry"] = (clockEntryId) => {
    setClockEntries((prevClockEntries) => prevClockEntries.filter((entry) => entry.id !== clockEntryId));
  };

  const clockInOut: ClockEntryContextType["clockInOut"] = (job) => {
    const clockEntry = clockEntries.find((ce) => {
      if (!job.clockedIn) return false;
      return ce.id === job.clockEntryIds.at(-1);
    });

    if (!clockEntry) {
      addClockEntry(job);
    } else {
      editClockEntry({ ...clockEntry, end: new Date() });
      editJob({ ...job, clockedIn: false });
    }
  };

  return (
    <ClockEntryContext.Provider value={{ editClockEntry, deleteClockEntry, clockInOut }}>
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
