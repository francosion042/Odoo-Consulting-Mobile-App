import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Home, Notifiactions, Profiles } from "../screens";
import ProjectsTabNavigator from "./projects";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackNavigator = ({ navigation, route }) => {
  const getHeaderTitle = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "Projects";

    switch (routeName) {
      case "Projects":
        return "Projects";
      case "Tasks":
        return "Tasks";
    }
  };

  if (route.state) {
    navigation.setOptions({
      tabBarVisible: route.state.index > 0 ? false : true,
    });
  }

  const shouldHeaderBeShown = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "Projects";

    switch (routeName) {
      case "Projects":
        return false;
    }
  };
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerLeft: null,
          headerStyle: {
            backgroundColor: "#7c7bad",
          },
          headerTintColor: "#fff",
        })}
      />
      <HomeStack.Screen
        name="Discuss"
        component={Home}
        options={() => ({
          headerStyle: {
            backgroundColor: "#7c7bad",
          },
          headerTintColor: "#fff",
        })}
      />
      <HomeStack.Screen
        name="Projects"
        component={ProjectsTabNavigator}
        options={({ route }) => ({
          title: getHeaderTitle(route),
          headerShown: shouldHeaderBeShown(route),
          headerStyle: {
            backgroundColor: "#7c7bad",
          },
          headerTintColor: "#fff",
        })}
      />
    </HomeStack.Navigator>
  );
};

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "ios-home";
          } else if (route.name === "Notifications") {
            iconName = focused ? "ios-list-box" : "ios-list";
          } else if (route.name === "Profile") {
            iconName = "md-person";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#7c7bad",
        inactiveTintColor: "gray",
      }}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Notifications" component={Notifiactions} />
      <Tab.Screen name="Profile" component={Profiles} />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
