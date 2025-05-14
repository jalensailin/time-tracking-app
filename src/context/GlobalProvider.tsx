import { AppProvider } from "./AppContext";
import { ClockEntryProvider } from "./ClockEntryContext";
import { JobProvider } from "./JobContext";

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AppProvider>
      <ClockEntryProvider>
        <JobProvider>{children}</JobProvider>
      </ClockEntryProvider>
    </AppProvider>
  );
};
