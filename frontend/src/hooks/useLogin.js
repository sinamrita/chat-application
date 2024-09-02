import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/authContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const login = async ({ password, username }) => {
    const valid = handleInputErrors(password, username);
    if (!valid) return;

    try {
      setLoading(true);
      const config = {
        url: `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username,
          password,
        },
      };
      const result = await axios(config);
      if (result.data.code === 1) {
        //local storage setup
        localStorage.setItem("chat-user", JSON.stringify(result.data.data));
        localStorage.setItem(
          "chat-token",
          JSON.stringify(result.data.data.token)
        );
        //context setup
        setUser(result.data.data);
        setLoading(false);
        return result.data.code;
      } else {
        setLoading(false);
        throw new Error(result.data.message);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  return { login, loading };
};

const handleInputErrors = (password, username) => {
  if (!password || !username) {
    toast.error("Please fill all fields.");
    return false;
  }

  return true;
};

export default useLogin;
