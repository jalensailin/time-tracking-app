import React, { createContext, useContext, useState } from "react";

import { Job } from "../types";
import { useAppContext } from "./AppContext";

interface JobContextType {
  addJob: (job: Job) => void;
  editJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  clockInOut: (job: Job) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { jobs, setJobs, clockEntries, setClockEntries } = useAppContext();

  const addJob: JobContextType["addJob"] = (job) => setJobs([...jobs, job]);

  const editJob: JobContextType["editJob"] = (updatedJob) =>
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));

  const deleteJob: JobContextType["deleteJob"] = (id) => setJobs(jobs.filter((job) => job.id !== id));

  const clockInOut: JobContextType["clockInOut"] = (job) => {
    const currentClockEntryId = job.clockedIn ? job.clockEntryIds.at(-1) : undefined;
    if (!currentClockEntryId) {
      const newId = Math.random().toString();
      const newClockEntry = { id: newId, start: new Date(), tagIds: [] };

      setClockEntries([...clockEntries, newClockEntry]);
      editJob({ ...job, clockEntryIds: [...job.clockEntryIds, newId], clockedIn: true });
      return;
    }

    const newClockEntriesList = clockEntries.map((clockEntry) => {
      return clockEntry.id !== currentClockEntryId ? clockEntry : { ...clockEntry, end: new Date() };
    });

    setClockEntries(newClockEntriesList);
    editJob({ ...job, clockedIn: false });
  };

  return <JobContext.Provider value={{ addJob, editJob, deleteJob, clockInOut }}>{children}</JobContext.Provider>;
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};
