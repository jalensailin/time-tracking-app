import { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useJobContext } from "../../context/JobContext";
import { Job } from "../../types";
import JobDetails from "./JobDetails";
import ClockInButton from "./ClockInButton";
import ClockInHistory from "./ClockInHistory";
import JobActions from "./JobActions";

interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
  const { clockInOut, deleteJob } = useJobContext();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <View style={styles.clipWrapper}>
      <Swipeable renderRightActions={() => <JobActions jobId={job.id} deleteJob={deleteJob} />}>
        <View style={styles.bubble}>
          <JobDetails job={job} />
          <View style={styles.buttonRow}>
            <ClockInButton clockedIn={job.clockedIn} onPress={() => clockInOut(job.id)} />
            <Button
              title={showHistory ? "Hide History" : "Show History"}
              onPress={() => setShowHistory(!showHistory)}
            />
          </View>
          {showHistory && <ClockInHistory history={job.clockIns} />}
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  clipWrapper: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  bubble: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default JobItem;
