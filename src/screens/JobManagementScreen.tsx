import { Button, FlatList, StyleSheet, View } from "react-native";

import { JobMgmtProps } from "../types";

import JobItem from "../components/JobManagement/JobItem";
import { useAppContext } from "../context/AppContext";

const JobManagementScreen = ({ navigation }: JobMgmtProps) => {
  const { jobs } = useAppContext();

  return (
    <View style={styles.container}>
      <FlatList data={jobs} keyExtractor={(item) => item.id} renderItem={({ item }) => <JobItem job={item} />} />
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
