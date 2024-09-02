import React, { useEffect, useRef } from "react";
import styles from "./MessageContainer.module.css";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className={styles.messageContainer}>
      {!loading &&
        messages.length !== 0 &&
        messages.map((msg) => {
          return (
            <div key={msg._id} ref={ref}>
              {" "}
              <Message message={msg} />{" "}
            </div>
          );
        })}
      {!loading && messages.length === 0 && (
        <div className={styles.warning}>
          <p>Send message to start conversation.</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
