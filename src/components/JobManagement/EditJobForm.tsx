import { View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Job } from "../../types";

interface EditJobFormProps {
  job: Job;
  updateJob: (job: Job) => void;
}

const EditJobForm = ({ job, updateJob }: EditJobFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: job,
  });

  return (
    <View>
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

      <Button title="Add Job" onPress={handleSubmit(updateJob)} />
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
