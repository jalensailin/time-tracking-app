import { Button } from "react-native";

interface ClockInButtonProps {
  clockedIn: boolean;
  onPress: () => void;
}

const ClockInButton = ({ clockedIn, onPress }: ClockInButtonProps) => {
  return (
    <Button title={clockedIn ? "Clock Out" : "Clock In"} onPress={onPress} />
  );
};

export default ClockInButton;
