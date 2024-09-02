import { useEffect, useState } from "react";
import { useSocketContext } from "../context/socketContext";

const useTyping = () => {
  const [typing, setTyping] = useState(false);
  const { socket } = useSocketContext();
  const [whoTyping,setWhoTyping] = useState([])
  
  useEffect(() => {
    if (socket) {
      var time;
      socket.on("isTyping", (_id) => {

        clearTimeout(time)

        setTyping(true);
        setWhoTyping((prev) => [...new Set([...prev,_id])])

        time = setTimeout(() => {
          setTyping(false)
          setWhoTyping([...whoTyping.filter(id => _id !== id)])
        },500)

      });
      return () => {
        socket.off("isTyping");
      };
    }
  }, [socket]);

  return { typing,whoTyping };
};

export default useTyping;
