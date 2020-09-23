import React, { createContext, useState } from "react";

const NotificationsContext = createContext();

const NotificationsContextProvider = (props) => {
  const [notifications, setNotifications] = useState([]);

  const addNotifications = (data) => {
    setNotifications([...data]);
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotifications,
      }}>
      {props.children}
    </NotificationsContext.Provider>
  );
};

export { NotificationsContextProvider, NotificationsContext };
