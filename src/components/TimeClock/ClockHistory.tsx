import { View, Text, StyleSheet, FlatList } from "react-native";
import { format } from "date-fns";

import { ClockEntry as ClockEntryType } from "../../types";

interface ClockHistoryProps {
  history: ClockEntryType[];
}

const ClockHistory = ({ history }: ClockHistoryProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clock-In History</Text>
      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>Start: {format(item.start, "Pp")}</Text>
            <Text>
              End: {item.end ? format(item.end, "Pp") : "In Progress"}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No history available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
  },
});

export default ClockHistory;
