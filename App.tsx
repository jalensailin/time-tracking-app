import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { RootStackParamList } from "./src/types";

/* ---------------------------- Context Providers --------------------------- */
import { AppProvider } from "./src/context/AppContext";
import { JobProvider } from "./src/context/JobContext";

/* --------------------------------- Screens -------------------------------- */
import JobManagementScreen from "./src/screens/JobManagementScreen";
import EditJobScreen from "./src/screens/EditJobScreen";
import ClockHistoryScreen from "./src/screens/ClockHistoryScreen";

/* -------------------------------------------------------------------------- */
/*                                     App                                    */
/* -------------------------------------------------------------------------- */

const App = () => {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <AppProvider>
          <JobProvider>
            <RootStack.Navigator initialRouteName="Job Management">
              <RootStack.Screen name="Job Management" component={JobManagementScreen} />
              <RootStack.Screen name="Edit Job" component={EditJobScreen} />
              <RootStack.Screen name="ClockHistory" component={ClockHistoryScreen} />
            </RootStack.Navigator>
          </JobProvider>
        </AppProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
