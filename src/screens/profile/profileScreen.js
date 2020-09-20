import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import styles from "./styles/profileStyles";
import { AuthContext } from "../../contexts";

function Profiles(props) {
  //   //access the authContext and call the createUser function
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <View style={styles.container}>
      <View style={styles.rect}>
        <EntypoIcon name="user" style={styles.icon2}></EntypoIcon>
      </View>
      <View style={styles.rect2}>
        <Text style={styles.profileName}>{user.name}</Text>
        <View style={styles.rect3}>
          <View style={styles.iconRow}>
            <EntypoIcon name="mail" style={styles.icon}></EntypoIcon>
            <Text style={styles.emailGmailCom}>{user.username}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.logOut}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profiles;
