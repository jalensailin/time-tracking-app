import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useJobContext } from "../context/JobContext";
import ClockEntry from "../components/JobManagement/ClockEntry";

const ClockHistoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { jobs } = useJobContext();

  // Get jobId from route params
  const { jobId } = route.params as { jobId: string };
  const job = jobs.find((job) => job.id === jobId);

  if (!job) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Job not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.name} - Clock-In History</Text>
      <FlatList
        data={job.clockIns}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ClockEntry clockIn={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No history available.</Text>}
      />
      <Button title="Back to Job List" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "red",
  },
});

export default ClockHistoryScreen;
