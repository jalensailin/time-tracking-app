import { StyleSheet, View } from "react-native";
import EditJobForm from "../components/JobManagement/EditJobForm";
import { EditProps, Job } from "../types";

const EditJobScreen = ({ route, navigation }: EditProps) => {
  const { mode, job, addJob } = route.params;

  const handleAddJob = ({ name, basePayRate }: Job) => {
    const newJob = {
      id: Math.random().toString(),
      name,
      basePayRate,
      timeEntries: [],
    };
    addJob(newJob);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <EditJobForm job={job} onSave={handleAddJob} />
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
