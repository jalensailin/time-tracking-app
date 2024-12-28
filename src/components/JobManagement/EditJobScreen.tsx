import { StyleSheet, View } from "react-native";
import AddJobForm from "../AddJobForm";

const EditJobScreen = ({ route, navigation }: any) => {
  const { addJob } = route.params;
  const handleAddJob = (name: string, basePayRate: number) => {
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
      <AddJobForm onAddJob={handleAddJob} />
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
