import { View, Text, StyleSheet } from "react-native";
import { Job } from "../../types";

interface JobDetailsProps {
  job: Job;
}

const JobDetails = ({ job }: JobDetailsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.name}</Text>
        <Text style={styles.payRate}>${job.basePayRate.toFixed(2)}/hr</Text>
      </View>
      <Text style={styles.status}>Status: {job.clockedIn ? "Clocked In" : "Clocked Out"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  payRate: {
    fontSize: 16,
    color: "#555",
  },
  status: {
    fontSize: 14,
    color: "#777",
  },
});

export default JobDetails;
