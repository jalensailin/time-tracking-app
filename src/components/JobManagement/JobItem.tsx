import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { Job } from "../../types";
import { useJobContext } from "../../context/JobContext";
import { format } from "date-fns"; // Install date-fns: npm install date-fns
import { useNavigation } from "@react-navigation/native";
import ClockInHistory from "./ClockInHistory";

interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
  const navigation = useNavigation();
  const { clockInOut, deleteJob } = useJobContext();
  const { name, basePayRate, id, clockIns, clockedIn } = job;

  const [showHistory, setShowHistory] = useState(false);

  return (
    <View style={styles.jobItem}>
      <Text style={styles.title}>{name}</Text>
      <Text>${basePayRate.toFixed(2)}/hr</Text>
      <Text>Status: {clockedIn ? "Clocked In" : "Clocked Out"}</Text>
      <Button title={clockedIn ? "Clock Out" : "Clock In"} onPress={() => clockInOut(job.id)} />
      <Button title="Edit" onPress={() => navigation.navigate("Edit Job", { id })} />
      <Button title="Delete" onPress={() => deleteJob(id)} />

      <Button title={showHistory ? "Hide History" : "Show History"} onPress={() => setShowHistory(!showHistory)} />
      {showHistory && <ClockInHistory history={clockIns} />}
    </View>
  );
};

const styles = StyleSheet.create({
  jobItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  historyItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default JobItem;
