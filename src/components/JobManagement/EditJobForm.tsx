import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { Job } from "../../types";

interface EditJobFormProps {
  job?: Job;
  onSave: (job: Job) => void;
}

const EditJobForm = ({ job }: EditJobFormProps) => {
  const blankJob: Job = { id: Math.random().toString(), name: "", basePayRate: 0 };
  const [jobState, setJobState] = useState(job || blankJob);

  const handleChange = ({ name }: any) => {
    console.log(this);
    // if (!jobState.name || !jobState.basePayRate) {
    //   alert("Please enter job name and base pay rate");
    //   return;
    // }
    setJobState({ ...jobState, name });
  };

  return (
    <View>
      <TextInput style={styles.input} placeholder="Job Name" value={jobState.name} onChangeText={handleChange} />
      <TextInput
        style={styles.input}
        placeholder="Base Pay Rate (Hourly)"
        keyboardType="numeric"
        value={jobState.basePayRate.toString()}
        onChange={handleChange}
      />
      <Button title="Add Job" onPress={handleChange} />
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
