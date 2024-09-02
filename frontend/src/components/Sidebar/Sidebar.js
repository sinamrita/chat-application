import React from "react";
import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import styles from "./Sidebar.module.css";
import Notification from "../Notification/Notification";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <SearchInput />
      <hr></hr>
      <Conversations />
      <hr></hr>
      <div className={styles.footer}>
        <LogoutButton />
        <div className={styles.right}>
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
