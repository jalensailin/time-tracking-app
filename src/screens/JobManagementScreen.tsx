import { Button, FlatList, StyleSheet, View } from "react-native";

import JobItem from "../components/JobManagement/JobItem";
import { JobMgmtProps } from "../types";
import { useJobContext } from "../context/JobContext";

const JobManagementScreen = ({ navigation }: JobMgmtProps) => {
  const { jobs } = useJobContext();

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <JobItem job={item} onEdit={() => navigation.navigate("Edit Job", { id: item.id })} />
        )}
      />
      <Button title="+" onPress={() => navigation.navigate("Edit Job", {})} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});

export default JobManagementScreen;
