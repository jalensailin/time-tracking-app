import { createContext, useContext, useMemo } from "react";

import { Job } from "../types";
import {
  addJob as addJobAction,
  deleteJob as deleteJobAction,
  editJob as editJobAction,
} from "../state/actions/jobActions";

import { useAppContext } from "./AppContext";

interface JobContextType {
  jobs: Job[];
  addJob: (jobData: Omit<Job, "id" | "clockEntryIds" | "clockedIn">) => void;
  editJob: (job: Job) => void;
  deleteJob: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, dispatch } = useAppContext();

  // Convert the jobs object to an array for easier consumption by components
  const jobs = useMemo(() => Object.values(state.jobs), [state.jobs]);

  const addJob = (jobData: Omit<Job, "id" | "clockEntryIds" | "clockedIn">) => {
    dispatch(addJobAction(jobData));
  };

  const editJob = (updatedJob: Job) => {
    dispatch(editJobAction(updatedJob));
  };

  const deleteJob = (id: string) => {
    dispatch(deleteJobAction(id));
  };

  return <JobContext.Provider value={{ jobs, addJob, editJob, deleteJob }}>{children}</JobContext.Provider>;
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};
