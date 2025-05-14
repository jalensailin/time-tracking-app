import { useState } from "react";

import { ClockEntry } from "../types";

export const useClockHistoryModal = () => {
  const [selectedEntry, setSelectedEntry] = useState<ClockEntry | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openEditModal = (clockEntry: ClockEntry) => {
    setSelectedEntry(clockEntry);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  };

  return { selectedEntry, modalVisible, openEditModal, closeModal };
};
