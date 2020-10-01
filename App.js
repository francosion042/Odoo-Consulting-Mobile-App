import React, { useContext, useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { Platform } from "react-native";
import he from "he";
import BackgroundTimer from "react-native-background-timer";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
import { Login } from "./src/screens";
import { HomeTabNavigator } from "./src/navigation";
import {
  AuthContextProvider,
  AuthContext,
  ProjectsContextProvider,
  TasksContextProvider,
  DiscussContextProvider,
  NotificationsContextProvider,
  NotificationsContext,
} from "./src/contexts";
import { LoadingScreen } from "./src/commons";
import { OdooConfig } from "./constants/configs";

const Stack = createStackNavigator();

function App() {
  const { user } = useContext(AuthContext);
  const { newNotifications, addNotifications } = useContext(
    NotificationsContext
  );
  const [isLoading, setIsLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  ////////////////////////////////////////Push Notification ////////////////////////////
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token))
      .catch((err) => console.log(err));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  /////////////////////////////////////////////Get Notification from odoo //////////////////////////////////////////
  useEffect(() => {
    const timer = setInterval(async () => {
      const Odoo = new OdooConfig(user.email, user.password);
      await Odoo.odoo
        .connect()
        .then((response) => {
          console.log(response.success);
          if (response.success) {
            //////////////////////////////////////////////
            // get all messages and add them to  the discuss context. this will make it easier to navigate between chats
            const params = {
              domain: [["message_type", "=", "notification"]],
              fields: [
                "id",
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
              .then(async (response) => {
                if (response.data) {
                  const notes = await response.data.filter((el) => {
                    return el.subject;
                  });
                  await addNotifications(notes);

                  setTimeout(() => {
                    console.log("New Notification ......", newNotifications);
                    // check if there's any new notification, then send the push notification if there is
                    if (newNotifications) {
                      newNotifications.map((n) => {
                        sendPushNotification(
                          expoPushToken,
                          n.subject,
                          extractHTML(n.body)
                        );
                      });
                    }
                  }, 2000);
                } else {
                  addNotifications(response.data);
                }
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }, 30000);
    return () => clearInterval(timer);
  });

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {/* check if the user data exists in the storage, otherwise show login page. */}
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="LogIn"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeTabNavigator}
            options={({ route }) => ({
              title: getHeaderTitle(route),
              headerShown: shouldHeaderBeShown(route),
              headerLeft: null,
              headerStyle: {
                backgroundColor: "#7c7bad",
              },
              headerTintColor: "#fff",
            })}
          />
        </Stack.Navigator>
      )}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default (props) => {
  return (
    <AuthContextProvider>
      <ProjectsContextProvider>
        <TasksContextProvider>
          <DiscussContextProvider>
            <NotificationsContextProvider>
              <App navigation={props.navigation} />
            </NotificationsContextProvider>
          </DiscussContextProvider>
        </TasksContextProvider>
      </ProjectsContextProvider>
    </AuthContextProvider>
  );
};

// Get header title from each screen in the hometab,
const getHeaderTitle = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "Home";

  switch (routeName) {
    case "Home":
      return "Home";
    case "Notifications":
      return "Notifications";
    case "Profile":
      return "Profile";
  }
};

const shouldHeaderBeShown = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "Home";

  switch (routeName) {
    case "Home":
      return false;
  }
};

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
async function sendPushNotification(expoPushToken, title, body) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: { data: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

////////////////////////////
// the body of each message is a string of HTML element, so it needs to be etracted and decoded
const extractHTML = (html) => {
  const decodedStripedHtml = he.decode(html.replace(/<[^>]+>/g, ""));
  return decodedStripedHtml;
};
/////////////////////////////
