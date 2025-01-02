import React, { createContext, useContext, useState } from "react";

import { Job } from "../types";

interface JobContextType {
  jobs: Job[];
  addJob: (job: Job) => void;
  editJob: (job: Job) => void;
  deleteJob: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJob = (job: Job) => setJobs([...jobs, job]);

  const editJob = (updatedJob: Job) => setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));

  const deleteJob = (id: string) => setJobs(jobs.filter((job) => job.id !== id));

  return <JobContext.Provider value={{ jobs, addJob, editJob, deleteJob }}>{children}</JobContext.Provider>;
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};
