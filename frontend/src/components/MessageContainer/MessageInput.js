import React, { useEffect, useState } from "react";
import styles from "./MessageContainer.module.css";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import useSendMessage from "../../hooks/useSendMessage";
import { useSocketContext } from "../../context/socketContext";
import { useSelector } from "react-redux";
import { useAuthContext } from "../../context/authContext";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { socket } = useSocketContext();
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { user } = useAuthContext();

  const sendMessageHandler = async () => {
    if (!message) {
      toast.error("Please write message.");
      return;
    }
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className={styles.messageInputCont}>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          socket.emit("typing", {
            typeFor: selectedConversation._id,
            whoType: user.id
          });
          setMessage(e.target.value);
        }}
        placeholder="Send a message..."
      />
      <button onClick={sendMessageHandler} className={styles.sendBtn}>
        <FiSend />
      </button>
    </div>
  );
};

export default MessageInput;
