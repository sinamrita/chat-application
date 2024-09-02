import { createContext, useContext, useState } from "react";

const Notification = createContext();

export const useNotification = () => {
  return useContext(Notification);
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState([]);
  return (
    <Notification.Provider value={{ notification, setNotification }}>
      {children}
    </Notification.Provider>
  );
};
