import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import odoo from "./constants/configs/odoo";

export default function App() {
  const [project, setProject] = useState();

  const params = {
    fields: ["name"],
    limit: 5,
    offset: 0,
  };

  odoo
    .search_read("project.project", params)
    .then((response) => {
      // setProject(response);
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    });
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Text>more</Text>
      <StatusBar style="auto" />
    </View>
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
