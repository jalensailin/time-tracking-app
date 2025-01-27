import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { Job } from "../../types";
import { useJobContext } from "../../context/JobContext";
import ClockInHistory from "./ClockInHistory";
import { useNavigation } from "@react-navigation/native";

interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
  const navigation = useNavigation();
  const { clockInOut, deleteJob } = useJobContext();
  const { name, basePayRate, id, clockIns, clockedIn } = job;

  const [showHistory, setShowHistory] = useState(false);

  const renderRightActions = () => (
    <View style={styles.actionContainer}>
      <Button title="Edit" onPress={() => navigation.navigate("Edit Job", { id })} />
      <Button title="Delete" onPress={() => deleteJob(id)} />
    </View>
  );

  return (
    <View style={styles.clipWrapper}>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.bubble}>
          <View style={styles.header}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.payRate}>${basePayRate.toFixed(2)}/hr</Text>
          </View>
          <Text style={styles.status}>Status: {clockedIn ? "Clocked In" : "Clocked Out"}</Text>
          <View style={styles.buttonRow}>
            <Button title={clockedIn ? "Clock Out" : "Clock In"} onPress={() => clockInOut(job.id)} />
            <Button
              title={showHistory ? "Hide History" : "Show History"}
              onPress={() => setShowHistory(!showHistory)}
            />
          </View>
          {showHistory && <ClockInHistory history={clockIns} />}
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  clipWrapper: {
    marginVertical: 10,
    borderRadius: 10, // Rounded corners
    overflow: "hidden", // Ensures nothing bleeds outside
  },
  bubble: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
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
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#e74c3c",
    padding: 10,
    marginTop: 0,
    height: "100%",
  },
  editButton: {
    backgroundColor: "#3498db",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
  },
});

export default JobItem;
