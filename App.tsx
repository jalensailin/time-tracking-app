import { useState } from "react";
import { View, StyleSheet } from "react-native";
import AddJobForm from "./src/components/AddJobForm";
import JobList from "./src/components/JobList/JobList";
import { Job } from "./src/types";

const App = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJob = (name: string, basePayRate: number) => {
    setJobs([...jobs, { id: Math.random().toString(), name, basePayRate }]);
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <View style={styles.container}>
      <AddJobForm onAddJob={addJob} />
      <JobList jobs={jobs} onDelete={deleteJob} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});

export default App;
