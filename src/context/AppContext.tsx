import { createContext, useContext, useReducer } from "react";

import { AppState } from "../types";
import { AppAction } from "../state/actions/appAction";

import { appReducer } from "../state/reducers/appReducer";

// Initial state
const initialState: AppState = {
  jobs: {},
  clockEntries: {},
};

// Create context with the state and dispatch function
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("`useAppContext()` must be used within the AppProvider.");
  }
  return context;
};
