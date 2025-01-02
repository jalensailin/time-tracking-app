import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EditJobScreen from "./src/screens/EditJobScreen";
import JobManagementScreen from "./src/screens/JobManagementScreen";
import { JobProvider } from "./src/context/JobContext";
import { RootStackParamList } from "./src/types";

const App = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <JobProvider>
        <RootStack.Navigator initialRouteName="Job Management">
          <RootStack.Screen name="Job Management" component={JobManagementScreen} />
          <RootStack.Screen name="Edit Job" component={EditJobScreen} />
        </RootStack.Navigator>
      </JobProvider>
    </NavigationContainer>
  );
};

export default App;
