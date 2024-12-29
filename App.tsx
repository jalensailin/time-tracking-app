import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JobManagementScreen from "./src/screens/JobManagementScreen";
import EditJobScreen from "./src/screens/EditJobScreen";
import { RootStackParamList } from "./src/types";

const App = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Job Management">
        <RootStack.Screen name="Job Management" component={JobManagementScreen} />
        <RootStack.Screen name="Edit Job" component={EditJobScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
