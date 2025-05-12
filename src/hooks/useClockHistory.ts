import { useState } from "react";

import { useAppContext } from "../context/AppContext";

import { ClockEntry } from "../types";

export const useClockHistory = () => {
  const { setClockEntries } = useAppContext();
  const [selectedEntry, setSelectedEntry] = useState<ClockEntry | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const editClockEntry = (clockEntryId: string, newStart: Date, newEnd?: Date) => {
    setClockEntries((prevClockEntries) =>
      prevClockEntries.map((entry) => (entry.id === clockEntryId ? { ...entry, start: newStart, end: newEnd } : entry))
    );
  };

  const deleteClockEntry = (clockEntryId: string) => {
    setClockEntries((prevClockEntries) => prevClockEntries.filter((entry) => entry.id !== clockEntryId));
  };

  const openEditModal = (clockEntry: ClockEntry) => {
    setSelectedEntry(clockEntry);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  };

  return { selectedEntry, modalVisible, openEditModal, closeModal, editClockEntry, deleteClockEntry };
};
