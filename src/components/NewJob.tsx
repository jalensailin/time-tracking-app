import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

interface Job {
  id: string;
  name: string;
  client?: string;
  basePayRate: number;
}

const NewJob = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobName, setJobName] = useState("");
  const [basePayRate, setBasePayRate] = useState("");

  const addJob = () => {
    if (!jobName || !basePayRate) {
      alert("Please enter job name and base pay rate");
      return;
    }

    const newJob: Job = {
      id: Math.random().toString(), // Temporary ID, can use a UUID library later
      name: jobName,
      basePayRate: parseFloat(basePayRate),
    };

    setJobs([...jobs, newJob]);
    setJobName("");
    setBasePayRate("");
  };

  const deleteJob = (id: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [updatedJobName, setUpdatedJobName] = useState("");
  const [updatedBasePayRate, setUpdatedBasePayRate] = useState("");

  const startEditing = (job: Job) => {
    setEditingJobId(job.id);
    setUpdatedJobName(job.name);
    setUpdatedBasePayRate(job.basePayRate.toString());
  };

  const saveEdit = () => {
    if (!updatedJobName || !updatedBasePayRate) {
      alert("Please fill out all fields");
      return;
    }

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === editingJobId ? { ...job, name: updatedJobName, basePayRate: parseFloat(updatedBasePayRate) } : job
      )
    );
    setEditingJobId(null);
    setUpdatedJobName("");
    setUpdatedBasePayRate("");
  };

  const cancelEdit = () => {
    setEditingJobId(null);
    setUpdatedJobName("");
    setUpdatedBasePayRate("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Job</Text>
      <TextInput style={styles.input} placeholder="Job Name" value={jobName} onChangeText={setJobName} />
      <TextInput
        style={styles.input}
        placeholder="Base Pay Rate (Hourly)"
        keyboardType="numeric"
        value={basePayRate}
        onChangeText={setBasePayRate}
      />
      <Button title="Add Job" onPress={addJob} />
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobItem}>
            {editingJobId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Job Name"
                  value={updatedJobName}
                  onChangeText={setUpdatedJobName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Base Pay Rate"
                  keyboardType="numeric"
                  value={updatedBasePayRate}
                  onChangeText={setUpdatedBasePayRate}
                />
                <Button title="Save" onPress={saveEdit} />
                <Button title="Cancel" onPress={cancelEdit} />
              </>
            ) : (
              <>
                <Text>{item.name}</Text>
                <Text>${item.basePayRate.toFixed(2)}/hr</Text>
                <Button title="Edit" onPress={() => startEditing(item)} />
                <Button title="Delete" onPress={() => deleteJob(item.id)} />
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  jobItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default NewJob;
