import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface JobActionsProps {
  jobId: string;
  deleteJob: (id: string) => void;
}

const JobActions = ({ jobId, deleteJob }: JobActionsProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.actionContainer}>
      <Button
        title="Edit"
        onPress={() => navigation.navigate("Edit Job", { id: jobId })}
      />
      <Button title="Delete" onPress={() => deleteJob(jobId)} />
    </View>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#e74c3c",
    padding: 10,
    height: "100%",
  },
});

export default JobActions;
