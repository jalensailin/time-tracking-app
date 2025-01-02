import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { Job, JobMgmtProps } from "../types";
import JobItem from "../components/JobManagement/JobItem";

const JobManagementScreen = ({ navigation }: JobMgmtProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJob = (job: Job) => {
    setJobs([...jobs, job]);
    navigation.goBack();
  };

  const editJob = (job: Job) => {
    setJobs(jobs.map((j) => (j.id === job.id ? job : j)));
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
        renderItem={({ item }) => (
          <JobItem
            job={item}
            onDelete={deleteJob}
            onEdit={() => navigation.navigate("Edit Job", { job: item, onSubmit: editJob })}
          />
        )}
      />
      <Button title="+" onPress={() => navigation.navigate("Edit Job", { onSubmit: addJob })} />
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
