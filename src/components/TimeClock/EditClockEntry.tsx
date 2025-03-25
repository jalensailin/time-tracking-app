import { useState, useEffect } from "react";
import { View, Text, Modal, Button, TextInput, StyleSheet } from "react-native";

import { ClockEntry } from "../../types";

interface EditClockEntryProps {
  visible: boolean;
  clockIn: ClockEntry | null;
  onSave: (newStart: string, newEnd?: string) => void;
  onClose: () => void;
}

const EditClockEntry = ({ visible, clockIn, onSave, onClose }: EditClockEntryProps) => {
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");

  useEffect(() => {
    if (clockIn) {
      setNewStart(clockIn.start.toISOString());
      setNewEnd(clockIn.end ? clockIn.end.toISOString() : "");
    }
  }, [clockIn]);

  if (!clockIn) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Edit Clock-In</Text>
        <Text>Start Time</Text>
        <TextInput style={styles.input} value={newStart} onChangeText={setNewStart} />
        <Text>End Time</Text>
        <TextInput style={styles.input} value={newEnd} onChangeText={setNewEnd} />
        <Button color={"blue"} title="Save" onPress={() => onSave(newStart, newEnd || undefined)} />
        <Button color={"blue"} title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    borderColor: "rgba(163, 17, 17, 1)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: 200,
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
    backgroundColor: "white",
  },
});

export default EditClockEntry;
