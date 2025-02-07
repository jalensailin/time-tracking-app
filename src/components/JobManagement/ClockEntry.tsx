import { View, Text, StyleSheet, Button } from "react-native";
import { format } from "date-fns";

import { ClockEntry as ClockEntryType } from "../../types";

interface ClockEntryProps {
  entry: ClockEntryType;
  onEdit: () => void;
  onDelete: () => void;
}

const ClockEntry = ({ entry, onEdit, onDelete }: ClockEntryProps) => {
  return (
    <View style={styles.entry}>
      <Text>Start: {format(entry.start, "Pp")}</Text>
      <Text>End: {entry.end ? format(entry.end, "Pp") : "In Progress"}</Text>
      <View style={styles.buttonRow}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  entry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
});

export default ClockEntry;
