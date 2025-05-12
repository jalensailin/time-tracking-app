import React, { createContext, useContext, useState } from "react";

import { Job } from "../types";
import { useAppContext } from "./AppContext";

interface JobContextType {
  addJob: (job: Job) => void;
  editJob: (job: Job) => void;
  deleteJob: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { jobs, setJobs, clockEntries, setClockEntries } = useAppContext();

  const addJob: JobContextType["addJob"] = (job) => setJobs([...jobs, job]);

  const editJob: JobContextType["editJob"] = (updatedJob) =>
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));

  const deleteJob: JobContextType["deleteJob"] = (id) => setJobs(jobs.filter((job) => job.id !== id));

  return <JobContext.Provider value={{ addJob, editJob, deleteJob }}>{children}</JobContext.Provider>;
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};
