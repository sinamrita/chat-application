import { useSelector, useDispatch } from "react-redux";
import { addMessages } from "../redux/slice/conversationSlice";
import { useSocketContext } from "../context/socketContext";
import { useEffect } from "react";
import { useNotification } from "../context/notificationContext";

const useGetSocketConversation = () => {
  const { messages, selectedConversation } = useSelector(
    (data) => data.conversation
  );
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const { setNotification } = useNotification();

  useEffect(() => {
    if (socket) {
      socket.on("recieved-message", (msg) => {
        if (
          !selectedConversation ||
          msg.sender_id !== selectedConversation._id
        ) {
          setNotification((prev) => [...prev, msg]);
        } else {
          dispatch(addMessages([...messages, msg]));
        }
      });
      return () => socket.off("recieved-message");
    }
  }, [messages, socket]);
};

export default useGetSocketConversation;
