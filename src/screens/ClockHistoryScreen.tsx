import { useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, Alert, Modal, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useJobContext } from "../context/JobContext";
import { ClockEntry as ClockEntryType } from "../types";

import ClockEntry from "../components/TimeClock/ClockEntry";

const ClockHistoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { jobs, editClockEntry, deleteClockEntry } = useJobContext();
  const { jobId } = route.params as { jobId: string };
  const job = jobs.find((job) => job.id === jobId);

  const [selectedEntry, setSelectedEntry] = useState<ClockEntryType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newStart, setNewStart] = useState<string>("");
  const [newEnd, setNewEnd] = useState<string>("");

  if (!job) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Job not found.</Text>
      </View>
    );
  }

  // Open edit modal
  const handleEdit = (clockEntry: ClockEntryType) => {
    setSelectedEntry(clockEntry);
    setNewStart(clockEntry.start.toISOString());
    setNewEnd(clockEntry.end ? clockEntry.end.toISOString() : "");
    setModalVisible(true);
  };

  // Save edited clock-in entry
  const saveEdit = () => {
    if (selectedEntry) {
      editClockEntry(jobId, selectedEntry.start, new Date(newStart), newEnd ? new Date(newEnd) : undefined);
      setModalVisible(false);
      setSelectedEntry(null);
    }
  };

  // Delete clock-in entry
  const handleDelete = (clockEntry: ClockEntryType) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this entry?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deleteClockEntry(jobId, clockEntry.start), style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.name} - Clock-In History</Text>
      <FlatList
        data={job.clockEntries}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ClockEntry entry={item} onEdit={() => handleEdit(item)} onDelete={() => handleDelete(item)} />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No history available.</Text>}
      />
      <Button title="Back to Job List" onPress={() => navigation.goBack()} />

      {/* Edit Clock-In Entry Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Clock-In</Text>
          <Text>Start Time (ISO Format)</Text>
          <TextInput style={styles.input} value={newStart} onChangeText={setNewStart} />
          <Text>End Time (ISO Format or empty for ongoing)</Text>
          <TextInput style={styles.input} value={newEnd} onChangeText={setNewEnd} />
          <Button title="Save" onPress={saveEdit} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: 200,
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
    backgroundColor: "white",
  },
});

export default ClockHistoryScreen;
