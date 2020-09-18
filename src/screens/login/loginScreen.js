import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { OdooConfig } from "../../../constants/configs";
import styles from "./styles/loginStyles";
import { LoadingScreen } from "../../commons";

//import { Font } from "expo-font";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(async () => {
  //   await Font.loadAsync({
  //     "aclonica-regular": require("../../../assets/fonts/aclonica-regular.ttf"),
  //     "roboto-700": require("../../../assets/fonts/roboto-700.ttf"),
  //     "roboto-regular": require("../../../assets/fonts/roboto-regular.ttf"),
  //   });
  //   setIsLoading(true);
  // });

  const authenticate = async () => {
    setIsLoading(true);
    const Odoo = new OdooConfig(email, password);

    await Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response);
        if (response.success) {
          setIsLoading(false);
          return navigation.navigate("Home");
        } else if (response.error.data.arguments[0] === "Access denied") {
          setIsLoading(false);
          setError("Incorrect Email or Password");
        } else {
          setIsLoading(false);
          return null;
        }
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  };
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.rect2}>
        <Text style={styles.loremIpsum}>Odoo Consulting Mobile App</Text>
      </View>
      <View style={styles.rect}>
        <Input
          placeholder="Email"
          placeholderColor="#c4c3cb"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.email}
        />
        <Input
          placeholder="Password"
          placeholderColor="#c4c3cb"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.password}
        />
        <Text style={styles.loremIpsum2}></Text>
        <TouchableOpacity onPress={() => authenticate()} style={styles.button}>
          <Text style={styles.logIn}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
