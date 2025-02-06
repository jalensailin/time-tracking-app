import { View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";
import { ClockIn } from "../../types";

interface ClockInEntryProps {
  clockIn: ClockIn;
}

const ClockInEntry = ({ clockIn }: ClockInEntryProps) => {
  return (
    <View style={styles.entry}>
      <Text>Start: {format(clockIn.start, "Pp")}</Text>
      <Text>End: {clockIn.end ? format(clockIn.end, "Pp") : "In Progress"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  entry: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default ClockInEntry;
