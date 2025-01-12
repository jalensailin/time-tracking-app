import React, { createContext, useContext, useState } from "react";

import { Job } from "../types";

interface JobContextType {
  jobs: Job[];
  addJob: (job: Job) => void;
  editJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  clockInOut: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJob = (job: Job) => setJobs([...jobs, job]);

  const editJob = (updatedJob: Job) => setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));

  const deleteJob = (id: string) => setJobs(jobs.filter((job) => job.id !== id));

  const clockInOut = (id: string) => {
    const newJobsList = jobs.map((job) => {
      if (job.id !== id) return job;

      const now = new Date();
      if (job.clockedIn) {
        const lastClockIn = job.clockIns[job.clockIns.length - 1];
        return { ...job, clockIns: [...job.clockIns, { start: lastClockIn.start, end: now }], clockedIn: false };
      } else {
        return { ...job, clockIns: [...job.clockIns, { start: now }], clockedIn: true };
      }
    });

    setJobs(newJobsList);
  };

  return <JobContext.Provider value={{ jobs, addJob, editJob, deleteJob, clockInOut }}>{children}</JobContext.Provider>;
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};
