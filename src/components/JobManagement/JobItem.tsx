import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { Job } from "../../types";
import { useJobContext } from "../../context/JobContext";
import { format } from "date-fns"; // Install date-fns: npm install date-fns
import { useNavigation } from "@react-navigation/native";

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

      {/* Toggle Clock-In/Out History */}
      <Button title={showHistory ? "Hide History" : "Show History"} onPress={() => setShowHistory(!showHistory)} />

      {/* Clock-In/Out History */}
      {showHistory && (
        <FlatList
          data={clockIns}
          keyExtractor={(item, index) => `${job.id}-clockin-${index}`}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text>Start: {format(new Date(item.start), "Pp")}</Text>
              <Text>End: {item.end ? format(new Date(item.end), "Pp") : "In Progress"}</Text>
            </View>
          )}
        />
      )}
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
