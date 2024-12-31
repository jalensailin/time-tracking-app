import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { Job, JobMgmtProps } from "../types";
import JobItem from "../components/JobManagement/JobItem";

const JobManagementScreen = ({ navigation }: JobMgmtProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const updateJob = (job: Job) => {
    setJobs([...jobs, job]);
    navigation.goBack();
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobItem job={item} onDelete={deleteJob} />}
      />
      <Button title="+" onPress={() => navigation.navigate("Edit Job", { updateJob })} />
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
