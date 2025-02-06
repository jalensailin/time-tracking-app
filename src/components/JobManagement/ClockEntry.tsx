import { View, Text, StyleSheet, Button } from "react-native";
import { format } from "date-fns";
import { ClockIn } from "../../types";

interface ClockInEntryProps {
  clockIn: ClockIn;
  onEdit: () => void;
  onDelete: () => void;
}

const ClockInEntry = ({ clockIn, onEdit, onDelete }: ClockInEntryProps) => {
  return (
    <View style={styles.entry}>
      <Text>Start: {format(clockIn.start, "Pp")}</Text>
      <Text>End: {clockIn.end ? format(clockIn.end, "Pp") : "In Progress"}</Text>
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

export default ClockInEntry;
