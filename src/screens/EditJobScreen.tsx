import { Button, StyleSheet, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import { EditProps, Job } from "../types";

import { useJobContext } from "../context/JobContext";
import { useAppContext } from "../context/AppContext";

const EditJobScreen = ({ navigation, route }: EditProps) => {
  const { jobs } = useAppContext();
  const { addJob, editJob } = useJobContext();
  const { id } = route.params;

  const job = jobs.find((job) => job.id === id);
  const blankJob: Job = {
    id: Math.random().toString(),
    name: "",
    basePayRate: 20,
    clockedIn: false,
    clockEntryIds: [],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: job || blankJob,
  });

  const onSubmit = (data: Job) => {
    if (job) {
      editJob(data);
    } else {
      addJob(data);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput style={styles.input} placeholder="Job Name" value={value} onChangeText={onChange} />
        )}
      />

      <Controller
        control={control}
        name="basePayRate"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Base Pay Rate"
            keyboardType="numeric"
            value={value.toString()}
            onChangeText={(value) => onChange(parseFloat(value) || "")}
          />
        )}
      />

      <Button title={id ? `Save Changes` : `Add Job`} onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default EditJobScreen;
