import React, { useContext, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "./src/screens";
import { HomeTabNavigator } from "./src/navigation";
import {
  AuthContextProvider,
  AuthContext,
  ProjectsContextProvider,
  TasksContextProvider,
  DiscussContextProvider,
  NotificationsContextProvider,
} from "./src/contexts";
import { LoadingScreen } from "./src/commons";

const Stack = createStackNavigator();

function App() {
  const { user } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  });

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
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {/* check if the user data exists in the storage, otherwise show login page. */}
      {!isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="LogIn"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
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
      )}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default (props) => {
  return (
    <AuthContextProvider>
      <ProjectsContextProvider>
        <TasksContextProvider>
          <DiscussContextProvider>
            <NotificationsContextProvider>
              <App navigation={props.navigation} />
            </NotificationsContextProvider>
          </DiscussContextProvider>
        </TasksContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  );
};
