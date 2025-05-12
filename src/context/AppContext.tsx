import { createContext, useContext, useState } from "react";
import { ClockEntry, Job } from "../types";

type ReactDispatch<T> = React.Dispatch<React.SetStateAction<T[]>>;
interface AppContextType {
  jobs: Job[];
  setJobs: ReactDispatch<Job>;
  clockEntries: ClockEntry[];
  setClockEntries: ReactDispatch<ClockEntry>;
  // tags: Tag[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [clockEntries, setClockEntries] = useState<ClockEntry[]>([]);

  return <AppContext.Provider value={{ jobs, setJobs, clockEntries, setClockEntries }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("`useAppContext()` must be used within the AppProvider.");
  }
  return context;
};
