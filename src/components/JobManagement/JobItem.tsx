import { View, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { useJobContext } from "../../context/JobContext";
import { Job } from "../../types";

import JobDetails from "./JobDetails";
import ClockInButton from "../TimeClock/ClockInButton";
import JobActions from "./JobActions";

interface JobItemProps {
  job: Job;
}

const JobItem = ({ job }: JobItemProps) => {
  const navigation = useNavigation();
  const { clockInOut, deleteJob } = useJobContext();
  return (
    <View style={styles.clipWrapper}>
      <Swipeable renderRightActions={() => <JobActions jobId={job.id} deleteJob={deleteJob} />}>
        <View style={styles.bubble}>
          <JobDetails job={job} />
          <View style={styles.buttonRow}>
            <ClockInButton clockedIn={job.clockedIn} onPress={() => clockInOut(job)} />
            <Button title="View Clock History" onPress={() => navigation.navigate("ClockHistory", { jobId: job.id })} />
          </View>
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
