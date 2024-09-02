import React from "react";
import styles from "./MessageContainer.module.css";
import { useAuthContext } from "../../context/authContext";
import { extractTime } from "../../utils";

const Message = ({ message }) => {
  const { user } = useAuthContext();

  const forme = user?.id === message?.sender_id;
  const time = extractTime(message.createdAt);
  const isLink =
    message.message.startsWith("https://") ||
    message.message.startsWith("http://");

  return (
    <div className="chat">
      <div data-time={time} className={`msg ${forme ? "sent" : "rcvd"}`}>
        {isLink ? (
          <a href={message.message} target="_blank">
            {message.message}
          </a>
        ) : (
          message.message
        )}
      </div>
    </div>
  );
};

export default Message;
