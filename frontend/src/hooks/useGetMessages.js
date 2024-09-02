import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToken from "./useToken";
import axios from "axios";
import { addMessages } from "../redux/slice/conversationSlice";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, selectedConversation } = useSelector(
    (state) => state.conversation
  );
  const token = useToken();
  const dispatch = useDispatch();
  useEffect(() => {
    const getMessages = async () => {
      const config = {
        url: `${process.env.REACT_APP_SERVER_URL}/message/get_msg/${selectedConversation?._id}`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      try {
        setLoading(true);
        const result = await axios(config);

        if (result.data.code === 1) {
          dispatch(addMessages([...result.data.messages]));
        } else {
          throw new Error(result.data.message);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    // if (selectedConversation?._id) {
    getMessages();
    // }
  }, [selectedConversation]);

  return { loading, messages };
};

export default useGetMessages;
