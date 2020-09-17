import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { odoo } from "../../../constants/configs";

export default function Login({ navigation }) {
  const signIn = () => {
    odoo
      .connect()
      .then((response) => {
        console.log(response);
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  };
  return (
    <View>
      <View>
        <Text>Username</Text>
        <TextInput />
        <Text>Password</Text>
        <TextInput />
      </View>
      <Button onPress={() => navigation.navigate("Home")} title="Sign In" />
    </View>
  );
}
