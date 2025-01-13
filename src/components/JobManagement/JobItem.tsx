import { View, Text, Button, StyleSheet } from "react-native";

import { Job } from "../../types";
import { useJobContext } from "../../context/JobContext";
import { useNavigation } from "@react-navigation/native";

interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
  const navigation = useNavigation();
  const { clockInOut, deleteJob } = useJobContext();
  const { name, basePayRate, id } = job;

  return (
    <View style={styles.jobItem}>
      <Text>{name}</Text>
      <Text>${basePayRate.toFixed(2)}/hr</Text>
      <Text>Status: {job.clockedIn ? "Clocked In" : "Clocked Out"}</Text>
      <Button title={job.clockedIn ? "Clock Out" : "Clock In"} onPress={() => clockInOut(job.id)} />
      <Button title="Edit" onPress={() => navigation.navigate("Edit Job", { id })} />
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
