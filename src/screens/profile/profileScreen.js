import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import styles from "./styles/profileStyles";
import { AuthContext } from "../../contexts";

function Profiles(props) {
  //   //access the authContext and call the createUser function
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.rect}>
          {/* <IoniconsIcon name="ios-person" style={styles.icon2}></IoniconsIcon> */}
          <Image
            source={{
              uri: `data:image/png;base64,${user.more_info[0].image_1920}`,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.rect4}>
          <Text style={styles.profileName}>{user.name}</Text>
          <View style={styles.rect3}>
            <View style={styles.iconRow}>
              <IoniconsIcon name="ios-mail" style={styles.icon}></IoniconsIcon>
              <Text style={styles.email2}>{user.more_info[0].email}</Text>
            </View>
          </View>
          <View style={styles.rect7}>
            <View style={styles.icon5Row}>
              <IoniconsIcon
                name="ios-phone-portrait"
                style={styles.icon5}></IoniconsIcon>
              <Text style={styles.phone}>{user.more_info[0].phone}</Text>
            </View>
          </View>
          <View style={styles.rect5}>
            <View style={styles.icon3Row}>
              <IoniconsIcon name="ios-pin" style={styles.icon3}></IoniconsIcon>
              <Text style={styles.street}>
                {user.more_info[0].street}, {user.more_info[0].city}
              </Text>
            </View>
          </View>
          <View style={styles.rect6}>
            <View style={styles.icon4Row}>
              <IoniconsIcon name="md-map" style={styles.icon4}></IoniconsIcon>
              <Text style={styles.country}>
                {user.more_info[0].country_id[1]}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.logOut}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default Profiles;
