import { FlatList } from "react-native";
import JobItem from "./JobItem";
import { Job } from "../../types";

interface JobListProps {
  jobs: Job[];
  onDelete: (id: string) => void;
}

const JobList = ({ jobs, onDelete }: JobListProps) => {
  return (
    <FlatList
      data={jobs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <JobItem job={item} onDelete={onDelete} />}
    />
  );
};

export default JobList;
