import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/authContext";

const useSignUp = () => {

  const [loading, setLoading] = useState(false);
  const {setUser} = useAuthContext()

  const signup = async ({
    full_name,
    password,
    gender,
    username,
    confirm_password
  }) => {
    const valid = handleInputErrors(
      full_name,
      password,
      gender,
      username,
      confirm_password
    );
    if (!valid) return;

    try {
      setLoading(true);
      const config = {
        url: `${process.env.REACT_APP_SERVER_URL}/auth/signup`,
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
          username,
          full_name,
          gender,
          password
        }
      };
      const result = await axios(config);
      if(result.data.code === 1){
        //local storage setup
        localStorage.setItem('chat-user',JSON.stringify(result.data.data))
        localStorage.setItem('chat-token',JSON.stringify(result.data.data.token))
        //context setup
        setUser(result.data.data)
        setLoading(false);
        return result.data.code 
      }else{
        setLoading(false);
        throw new Error(result.data.message)
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  return { signup, loading };
};

const handleInputErrors = (
  full_name,
  password,
  gender,
  username,
  confirm_password
) => {
  if (!full_name || !password || !confirm_password || !gender || !username) {
    toast.error("Please fill all fields.");
    return false;
  }

  if (password !== confirm_password) {
    toast.error("Password not match.");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be greter than 5 digits.");
    return false;
  }

  return true;
};

export default useSignUp;
