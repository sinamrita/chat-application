import React, { useEffect } from "react";
import styles from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addConversation,
  resetConversation,
  resetMessages
} from "../../redux/slice/conversationSlice";
import { useSocketContext } from "../../context/socketContext";
import { useNotification } from "../../context/notificationContext";
import useTyping from "../../hooks/useTyping";
import Notification from "../Notification/Notification";

const Conversation = ({ profile, name, conversation }) => {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((data) => data.conversation);
  const selected = selectedConversation?._id === conversation?._id;
  const { onlineUsers } = useSocketContext();
  const online = onlineUsers?.includes(conversation._id);
  const { notification, setNotification } = useNotification();
  const { typing, whoTyping } = useTyping();
  const who = whoTyping?.includes(conversation._id);

  const onSelectHandler = () => {
    dispatch(addConversation(conversation));
    setNotification([
      ...notification.filter((notify) => notify.sender_id !== conversation._id)
    ]);
  };

  const notifica = [
    ...notification.filter((notify) => notify.sender_id === conversation._id)
  ];

  useEffect(() => {
    return () => {
      dispatch(resetConversation());
      dispatch(resetMessages());
    };
  }, []);

  return (
    <div
      onClick={onSelectHandler}
      className={`${styles.tile} ${selected ? styles.activeTile : ""}`}>
      <div className={styles.left}>
        <div className={`${styles.avatar} ${online ? styles.online : ""}`}>
          <img src={profile} alt="profile" />
          <span></span>
        </div>
        <div className={styles.name}>
          <p>{name}</p>
          {typing && who && (
            <strong className={styles.typing}>Typing...</strong>
          )}
        </div>
      </div>
      {notifica.length !== 0 && (
        <div className={styles.right}>
          <span className={styles.indicator}>
            <strong>{notifica.length}</strong>
          </span>
        </div>
      )}
    </div>
  );
};

export default Conversation;
