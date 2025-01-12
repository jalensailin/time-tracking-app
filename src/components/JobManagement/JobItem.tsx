import { View, Text, Button, StyleSheet } from "react-native";

import { Job } from "../../types";
import { useJobContext } from "../../context/JobContext";

interface JobItemProps {
  job: Job;
  onEdit: (job: Job) => void;
}

const JobItem = ({ job, onEdit }: JobItemProps) => {
  const { clockInOut, deleteJob } = useJobContext();
  const { name, basePayRate, id } = job;

  return (
    <View style={styles.jobItem}>
      <Text>{name}</Text>
      <Text>${basePayRate.toFixed(2)}/hr</Text>
      <Text>Status: {job.clockedIn ? "Clocked In" : "Clocked Out"}</Text>
      <Button title={job.clockedIn ? "Clock Out" : "Clock In"} onPress={() => clockInOut(job.id)} />
      <Button title="Edit" onPress={() => onEdit(job)} />
      <Button title="Delete" onPress={() => deleteJob(id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  jobItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default JobItem;
