import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Login, Home } from "./src/screens";
import { odoo } from "./constants/configs";

const Stack = createStackNavigator();

export default function App() {
  // const [project, setProject] = useState();

  // const params = {
  //   fields: ["name"],
  //   limit: 5,
  //   offset: 0,
  // };

  // odoo
  //   .search_read("project.project", params)
  //   .then((response) => {
  //     // setProject(response);
  //     console.log(response);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={Login} />

        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
