import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Job } from "../../types";

interface JobItemProps {
  job: Job;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
}

const JobItem = ({ job, onDelete, onEdit }: JobItemProps) => {
  const { name, basePayRate, id } = job;
  return (
    <View style={styles.jobItem}>
      <>
        <Text>{name}</Text>
        <Text>${basePayRate.toFixed(2)}/hr</Text>
        <Button title="Edit" onPress={() => onEdit(job)} />
        <Button title="Delete" onPress={() => onDelete(id)} />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  jobItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default JobItem;
