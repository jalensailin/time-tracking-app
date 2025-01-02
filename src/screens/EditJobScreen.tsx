import { Button, StyleSheet, TextInput, View } from "react-native";
import { EditProps, Job } from "../types";
import { Controller, useForm } from "react-hook-form";

const EditJobScreen = ({ route }: EditProps) => {
  const { job, onSubmit } = route.params;
  const blankJob: Job = { id: Math.random().toString(), name: "", basePayRate: 20 };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: job || blankJob,
  });

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
        rules={{ required: true, min: 18 }}
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

      <Button title="Add Job" onPress={handleSubmit(onSubmit)} />
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
