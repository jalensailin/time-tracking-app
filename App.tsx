import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { RootStackParamList } from "./src/types";

/* ---------------------------- Context Providers --------------------------- */
import { GlobalStateProvider } from "./src/context/GlobalProvider";

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
        <GlobalStateProvider>
          <RootStack.Navigator initialRouteName="Job Management">
            <RootStack.Screen name="Job Management" component={JobManagementScreen} />
            <RootStack.Screen name="Edit Job" component={EditJobScreen} />
            <RootStack.Screen name="ClockHistory" component={ClockHistoryScreen} />
          </RootStack.Navigator>
        </GlobalStateProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
