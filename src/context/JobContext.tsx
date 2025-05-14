import { createContext, useContext, useMemo } from "react";

import { Job, ID } from "../types";
import {
  ADD_JOB,
  EDIT_JOB,
  DELETE_JOB,
  NewJobData,
} from "../state/actions/jobActions";

import { useAppContext } from "./AppContext";

interface JobContextType {
  jobs: Job[];
  addJob: (jobData: Omit<Job, "id" | "clockEntryIds" | "clockedIn">) => void;
  editJob: (job: Job) => void;
  deleteJob: (id: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { state, dispatch } = useAppContext();

  // Convert the jobs object to an array for easier consumption by components
  const jobs = useMemo(() => Object.values(state.jobs), [state.jobs]);

  const addJob = (jobData: NewJobData) => {
    dispatch({ type: ADD_JOB, payload: jobData });
  };

  const editJob = (updatedJob: Job) => {
    dispatch({ type: EDIT_JOB, payload: updatedJob });
  };

  const deleteJob = (id: ID) => {
    dispatch({ type: DELETE_JOB, payload: id });
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, editJob, deleteJob }}>
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
