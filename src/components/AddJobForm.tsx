import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

interface AddJobFormProps {
  onAddJob: (name: string, basePayRate: number) => void;
}

const AddJobForm = ({ onAddJob }: AddJobFormProps) => {
  const [jobName, setJobName] = useState("");
  const [basePayRate, setBasePayRate] = useState("");

  const handleAddJob = () => {
    if (!jobName || !basePayRate) {
      alert("Please enter job name and base pay rate");
      return;
    }
    onAddJob(jobName, parseFloat(basePayRate));
    setJobName("");
    setBasePayRate("");
  };

  return (
    <View>
      <TextInput style={styles.input} placeholder="Job Name" value={jobName} onChangeText={setJobName} />
      <TextInput
        style={styles.input}
        placeholder="Base Pay Rate (Hourly)"
        keyboardType="numeric"
        value={basePayRate}
        onChangeText={setBasePayRate}
      />
      <Button title="Add Job" onPress={handleAddJob} />
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

export default AddJobForm;
