import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { OdooConfig } from "../../../constants/configs";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signIn = async () => {
    const Odoo = new OdooConfig(email, password);

    await Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response);
        if (response.success) {
          return navigation.navigate("Home");
        } else if (response.error.data.arguments[0] === "Access denied") {
          setError("Incorrect Email or Password");
        } else {
          return null;
        }
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  };
  return (
    <View>
      <View>
        <Text>{error}</Text>
        <Input
          placeholder="Email"
          placeholderColor="#c4c3cb"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Password"
          placeholderColor="#c4c3cb"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Button onPress={() => signIn()} title="Sign In" />
    </View>
  );
}
