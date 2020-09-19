import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Projects } from "../screens";

const ProjectsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const ProjectsStackNavigator = ({ navigation, route }) => {
//     return (
//         <ProjectsStack.Navigator>
//             <ProjectsStack.Screen
//                 name="Projects"
//                 component={Projects}
//                 options={() => ({
//                     headerStyle: {
//                         backgroundColor: "#7c7bad",
//                     },
//                     headerTintColor: "#fff",
//                 })}
//             />
//         </ProjectsStack.Navigator>
//     );
// };

const ProjectsTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Projects") {
            iconName = "ios-briefcase";
          } else if (route.name === "Tasks") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#7c7bad",
        inactiveTintColor: "gray",
      }}>
      <Tab.Screen name="Projects" component={Projects} />
      <Tab.Screen name="Tasks" component={Projects} />
    </Tab.Navigator>
  );
};

export default ProjectsTabNavigator;
