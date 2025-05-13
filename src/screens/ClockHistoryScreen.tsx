import { View, Text, FlatList, StyleSheet, Button, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useClockEntryContext } from "../context/ClockEntryContext";
import { useJobContext } from "../context/JobContext";

import { useClockHistory } from "../hooks/useClockHistory";

import ClockEntry from "../components/TimeClock/ClockEntry";
import EditClockEntry from "../components/TimeClock/EditClockEntry";

const ClockInHistoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { jobId } = route.params as { jobId: string };
  const { jobs } = useJobContext();
  const { getClockEntriesForJob } = useClockEntryContext();

  const job = jobs.find((job) => job.id === jobId);
  const clockEntries = getClockEntriesForJob(jobId);

  const { selectedEntry, modalVisible, openEditModal, closeModal } = useClockHistory();
  const { editClockEntry, deleteClockEntry } = useClockEntryContext();
  if (!job) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Job not found.</Text>
      </View>
    );
  }

  // Handle Delete Confirmation
  const handleDelete = (clockEntryId: string) => {
    Alert.alert("Confirm Delete", "Delete this Time Clock entry?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => deleteClockEntry(clockEntryId), style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.name} - Clock-In History</Text>
      <FlatList
        data={clockEntries}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <ClockEntry entry={item} onEdit={() => openEditModal(item)} onDelete={() => handleDelete(item.id)} />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No history available.</Text>}
      />
      <Button title="Back to Job List" onPress={() => navigation.goBack()} />

      {/* Edit Modal */}
      <EditClockEntry
        visible={modalVisible}
        clockIn={selectedEntry}
        onSave={(newStart, newEnd) => {
          if (selectedEntry) {
            editClockEntry({ ...selectedEntry, start: new Date(newStart), end: newEnd ? new Date(newEnd) : undefined });
          }
          closeModal();
        }}
        onClose={closeModal}
      />
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

export default ClockInHistoryScreen;
