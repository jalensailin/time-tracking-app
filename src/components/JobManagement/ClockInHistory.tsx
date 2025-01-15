import { View, Text, StyleSheet, FlatList } from "react-native";

import { ClockIn } from "../../types";
import { format } from "date-fns";

interface ClockInHistoryProps {
  history: ClockIn[];
}

const ClockInHistory = ({ history }: ClockInHistoryProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clock-In History</Text>
      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>Start: {format(item.start, "Pp")}</Text>
            <Text>End: {item.end ? format(item.end, "Pp") : "In Progress"}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No history available.</Text>}
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

export default ClockInHistory;
