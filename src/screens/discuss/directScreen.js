import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { OdooConfig } from "../../../constants/configs";
import { AuthContext, DiscussContext } from "../../contexts";
import { LoadingScreen, ErrorScreen } from "../../commons";

export default function Channels({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  const { user } = useContext(AuthContext);
  const { directChannels, addDirectChannels } = useContext(DiscussContext);

  useEffect(() => {
    const Odoo = new OdooConfig(user.email, user.password);

    Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response.success);
        if (response.success) {
          const params = {
            domain: [["channel_type", "=", "chat"]],
            fields: ["name", "channel_type", "channel_message_ids"],
          };

          Odoo.odoo
            .search_read("mail.channel", params)
            .then((response) => {
              addDirectChannels(response.data);
              setIsLoading(false);
            })
            .catch((e) => {
              console.log(e);
            });
          ///////////////////////////////////////////////////
        } else {
          setIsLoading(false);
          setNetworkError(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setNetworkError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  } else if (networkError) {
    <ErrorScreen />;
  }
  return (
    <View>
      <ScrollView>
        {directChannels.map((c, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigation.navigate("DirectMessages", {
                channel_id: c.id,
                channel_name: c.name,
              })
            }>
            <ListItem bottomDivider>
              <Ionicons name="ios-people" size={40} color="#7c7bad" />
              <ListItem.Content>
                <ListItem.Title>{c.name}</ListItem.Title>
                <ListItem.Subtitle>
                  Num of Messages: {c.channel_message_ids.length}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
