import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/screens";
import { HomeTabNavigator } from "./src/navigation";
import {
  AuthContextProvider,
  ProjectsContextProvider,
  TasksContextProvider,
} from "./src/contexts";

const Stack = createStackNavigator();

function App() {
  const getHeaderTitle = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "Home";

    switch (routeName) {
      case "Home":
        return "Home";
      case "Notifications":
        return "Notifications";
      case "Profile":
        return "Profile";
    }
  };

  const shouldHeaderBeShown = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "Home";

    switch (routeName) {
      case "Home":
        return false;
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LogIn"
          component={Login}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeTabNavigator}
          options={({ route }) => ({
            title: getHeaderTitle(route),
            headerShown: shouldHeaderBeShown(route),
            headerLeft: null,
            headerStyle: {
              backgroundColor: "#7c7bad",
            },
            headerTintColor: "#fff",
          })}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default (props) => {
  return (
    <AuthContextProvider>
      <ProjectsContextProvider>
        <TasksContextProvider>
          <App navigation={props.navigation} />
        </TasksContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  );
};
