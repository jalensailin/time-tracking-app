import React, { createContext, useContext, useState } from "react";

import { ClockEntry, Job } from "../types";

interface JobContextType {
  jobs: Job[];
  addJob: (job: Job) => void;
  editJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  clockEntries: ClockEntry[];
  setClockEntries: React.Dispatch<React.SetStateAction<ClockEntry[]>>;
  clockInOut: (job: Job) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [clockEntries, setClockEntries] = useState<ClockEntry[]>([]);

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

  return (
    <JobContext.Provider value={{ jobs, addJob, editJob, deleteJob, clockEntries, setClockEntries, clockInOut }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};
