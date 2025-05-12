import { useState } from "react";

import { useAppContext } from "../context/AppContext";
import { useJobContext } from "../context/JobContext";

import { ClockEntry, Job } from "../types";

export const useClockHistory = () => {
  const { clockEntries, setClockEntries } = useAppContext();
  const { editJob } = useJobContext();

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

  const clockInOut = (job: Job) => {
    const currentClockEntryId = job.clockedIn ? job.clockEntryIds.at(-1) : undefined;
    if (!currentClockEntryId) {
      const newId = Math.random().toString();
      const newClockEntry = { id: newId, start: new Date(), tagIds: [] };

      setClockEntries([...clockEntries, newClockEntry]);
      editJob({ ...job, clockEntryIds: [...job.clockEntryIds, newId], clockedIn: true });
      return;
    }

    const newClockEntriesList = clockEntries.map((clockEntry) => {
      return clockEntry.id !== currentClockEntryId ? clockEntry : { ...clockEntry, end: new Date() };
    });

    setClockEntries(newClockEntriesList);
    editJob({ ...job, clockedIn: false });
  };

  const openEditModal = (clockEntry: ClockEntry) => {
    setSelectedEntry(clockEntry);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  };

  return { selectedEntry, modalVisible, openEditModal, closeModal, editClockEntry, deleteClockEntry, clockInOut };
};
