import React from "react";
import { useNotification } from "../../context/notificationContext";
import { IoNotifications } from "react-icons/io5";
import styles from "./Notification.module.css";

const Notification = () => {
  const { notification } = useNotification();
  return (
    <div
      data-count={notification.length}
      className={`${notification.length === 0 ? "" : styles.alert} ${
        styles.notify
      }`}>
      <IoNotifications />
    </div>
  );
};

export default Notification;
