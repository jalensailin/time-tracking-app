import { useState } from "react";

import { ClockEntry, Job } from "../types";

export const useClockHistory = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<ClockEntry | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const editClockEntry = (jobId: string, originalStart: Date, newStart: Date, newEnd?: Date) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              clockEntries: job.clockEntries.map((entry) =>
                entry.start.getTime() === originalStart.getTime() ? { start: newStart, end: newEnd } : entry
              ),
            }
          : job
      )
    );
  };

  const deleteClockEntry = (jobId: string, start: Date) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? { ...job, clockEntries: job.clockEntries.filter((entry) => entry.start.getTime() !== start.getTime()) }
          : job
      )
    );
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
