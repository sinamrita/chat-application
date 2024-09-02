import React from "react";
import styles from "./MessageContainer.module.css";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useSelector } from "react-redux";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/authContext";
import useGetSocketConversation from "../../hooks/useGetSocketConversation";

const MessageContainer = () => {
  const { selectedConversation } = useSelector((data) => data.conversation);
  const { user } = useAuthContext();
  useGetSocketConversation();

  return (
    <div className={styles.messageCont}>
      {!selectedConversation && (
        <div className={styles.notSelectUserContainer}>
          <div className={styles.contentNoSelect}>
            <p>Welcome 👋 {user?.full_name}</p>
            <p>Select a chat to start messaging</p>
            <TiMessages className="text-3xl md:text-6xl text-center" />
          </div>
        </div>
      )}
      {selectedConversation && (
        <>
          <div className={styles.heading}>
            <p>
              <span>To : </span>
              <span>
                <strong>{selectedConversation?.full_name}</strong>
              </span>
            </p>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
