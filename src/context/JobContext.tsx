import React, { createContext, useContext, useState } from "react";

import { Job } from "../types";

interface JobContextType {
  jobs: Job[];
  addJob: (job: Job) => void;
  editJob: (job: Job) => void;
  deleteJob: (id: string) => void;
  clockInOut: (id: string) => void;
  deleteClockEntry: (jobId: string, start: Date) => void;
  editClockEntry: (jobId: string, originalStart: Date, newStart: Date, newEnd?: Date) => void;
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
        const updatedClockEntries = job.clockEntries.map((clockEntry) =>
          clockEntry.end ? clockEntry : { ...clockEntry, end: now }
        );
        return { ...job, clockEntries: updatedClockEntries, clockedIn: false };
      } else {
        return { ...job, clockEntries: [...job.clockEntries, { start: now }], clockedIn: true };
      }
    });

    setJobs(newJobsList);
  };

  const editClockEntry = (jobId: string, originalStart: Date, newStart: Date, newEnd?: Date) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              clockEntries: job.clockEntries.map((entry) =>
                entry.start.getTime() === originalStart.getTime() ? { start: newStart, end: newEnd } : entry
              ),
            }
          : job
      )
    );
  };

  const deleteClockEntry = (jobId: string, start: Date) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, clockEntries: job.clockEntries.filter((entry) => entry.start.getTime() !== start.getTime()) }
          : job
      )
    );
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, editJob, deleteJob, clockInOut, editClockEntry, deleteClockEntry }}>
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
