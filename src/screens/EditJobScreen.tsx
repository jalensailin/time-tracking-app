import { StyleSheet, View } from "react-native";
import EditJobForm from "../components/JobManagement/EditJobForm";
import { EditProps, Job } from "../types";

const EditJobScreen = ({ route, navigation }: EditProps) => {
  const { mode, job, updateJob } = route.params;
  console.log(job);

  const blankJob: Job = { id: Math.random().toString(), name: "", basePayRate: 20 };
  const handleAddJob = (job2: Job) => {
    updateJob(job2 || blankJob);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <EditJobForm job={job || blankJob} onSave={handleAddJob} />
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
