import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { OdooConfig } from "../../../constants/configs";
import styles from "./styles/loginStyles";
import { LoadingScreen } from "../../commons";
import { AuthContextProvider, AuthContext } from "../../contexts";

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //access the authContext and call the createUser function
  const { createUser, user } = useContext(AuthContext);

  const authenticate = async () => {
    setIsLoading(true);
    const Odoo = new OdooConfig(email, password);

    await Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response.success);
        if (response.success) {
          createUser(response.data);
          setIsLoading(false);
          return navigation.navigate("Home");
        } else if (response.error.data.arguments[0] === "Access denied") {
          setIsLoading(false);
          setError("Incorrect Email or Password");
        } else if (!response.success) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
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

// export default (props) => {
//   return (
//     <AuthContextProvider>
//       <Login navigation={props.navigation} />
//     </AuthContextProvider>
//   );
// };

export default Login;
