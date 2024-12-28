import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Job } from "../../types";

interface EditJobFormProps {
  job: Job;
  onSave: (updatedJob: Job) => void;
  onCancel: () => void;
}

const EditJobForm = ({ job, onSave, onCancel }: EditJobFormProps) => {
  const [name, setName] = useState(job.name);
  const [basePayRate, setBasePayRate] = useState(job.basePayRate.toString());

  const handleSave = () => {
    if (!name || !basePayRate) {
      alert("Please fill out all fields");
      return;
    }
    onSave({ ...job, name, basePayRate: parseFloat(basePayRate) });
  };

  return (
    <View>
      <TextInput style={styles.input} placeholder="Job Name" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Base Pay Rate"
        keyboardType="numeric"
        value={basePayRate}
        onChangeText={setBasePayRate}
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default EditJobForm;
