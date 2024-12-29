import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import JobList from "../components/JobManagement/JobList";
import { Job, JobMgmtProps } from "../types";

const JobManagementScreen = ({ navigation }: JobMgmtProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJob = (job: Job) => {
    setJobs([...jobs, job]);
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };
  return (
    <View style={styles.container}>
      <JobList jobs={jobs} onDelete={deleteJob} />
      <Button title="+" onPress={() => navigation.navigate("Edit Job", { addJob })} />
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

export default JobManagementScreen;
