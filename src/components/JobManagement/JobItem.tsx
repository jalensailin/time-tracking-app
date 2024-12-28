import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Job } from "../../types";

interface JobItemProps {
  job: Job;
  onDelete: (id: string) => void;
}

const JobItem = ({ job, onDelete }: JobItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(job.name);
  const [basePayRate, setBasePayRate] = useState(job.basePayRate.toString());

  const handleSave = () => {
    if (!name || !basePayRate) {
      alert("Please fill out all fields");
      return;
    }
    job.name = name;
    job.basePayRate = parseFloat(basePayRate);
    setIsEditing(false);
  };

  return (
    <View style={styles.jobItem}>
      {isEditing ? (
        <>
          <TextInput style={styles.input} placeholder="Job Name" value={name} onChangeText={setName} />
          <TextInput
            style={styles.input}
            placeholder="Base Pay Rate"
            keyboardType="numeric"
            value={basePayRate}
            onChangeText={setBasePayRate}
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={() => setIsEditing(false)} />
        </>
      ) : (
        <>
          <Text>{job.name}</Text>
          <Text>${job.basePayRate.toFixed(2)}/hr</Text>
          <Button title="Edit" onPress={() => setIsEditing(true)} />
          <Button title="Delete" onPress={() => onDelete(job.id)} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  jobItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default JobItem;
