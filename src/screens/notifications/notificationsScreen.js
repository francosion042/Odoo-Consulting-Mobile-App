import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, Image, RefreshControl } from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import he from "he";
import { OdooConfig } from "../../../constants/configs";
import { AuthContext, NotificationsContext } from "../../contexts";
import { LoadingScreen } from "../../commons";
import styles from "./styles/notificationsStyles";

export default function Notifications() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { user } = useContext(AuthContext);
  const { notifications, addNotifications } = useContext(NotificationsContext);

  ////////////////////////////
  // the body of each message is a string of HTML element, so it needs to be etracted and decoded
  const extractHTML = (html) => {
    const decodedStripedHtml = he.decode(html.replace(/<[^>]+>/g, ""));
    return decodedStripedHtml;
  };
  /////////////////////////////

  useEffect(() => {
    const Odoo = new OdooConfig(user.email, user.password);

    Odoo.odoo
      .connect()
      .then((response) => {
        console.log(response.success);
        if (response.success) {
          //////////////////////////////////////////////
          // get all messages and add them to  the discuss context. this will make it easier to navigate between chats
          const params = {
            domain: [["message_type", "=", "notification"]],
            fields: [
              "subject",
              "body",
              "author_id",
              "author_avatar",
              "message_type",
              "channel_ids",
              "date",
            ],
            order: "date DESC",
          };

          Odoo.odoo
            .search_read("mail.message", params)
            .then((response) => {
              if (response.data) {
                const notes = response.data.filter((el) => {
                  return el.subject;
                });
                addNotifications(notes);
              } else {
                addNotifications(response.data);
              }

              setIsLoading(false);
              setIsRefreshing(false);
            })
            .catch((e) => {
              console.log(e);
            });
          ///////////////////////////////////////////////////
        } else {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, [isRefreshing]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => setIsRefreshing(true)}
          />
        }>
        {notifications.map((n, i) => (
          <ListItem key={i} bottomDivider>
            {n.author_avatar ? (
              <Image
                style={styles.avatar}
                source={{ uri: `data:image/png;base64,${n.author_avatar}` }}
              />
            ) : (
              <Ionicons name="ios-notifications" size={30} color="#7c7bad" />
            )}

            <ListItem.Content>
              <ListItem.Title style={styles.author}>
                {n.author_id[1]}
                {" - "}
                <ListItem.Subtitle style={styles.date}>
                  {n.date}
                </ListItem.Subtitle>
              </ListItem.Title>

              <ListItem.Content>
                <ListItem.Subtitle style={styles.subject}>
                  Subject: {n.subject}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content>
                <ListItem.Subtitle>
                  Body:{" "}
                  {extractHTML(n.body)
                    ? extractHTML(n.body)
                    : "(images are not supported)"}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
}
