import { StyleSheet, View } from "react-native";
import EditJobForm from "../components/JobManagement/EditJobForm";
import { EditProps, Job } from "../types";

const EditJobScreen = ({ route }: EditProps) => {
  const { job, onSubmit } = route.params;

  const blankJob: Job = { id: Math.random().toString(), name: "", basePayRate: 20 };

  return (
    <View style={styles.container}>
      <EditJobForm job={job || blankJob} onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default EditJobScreen;
