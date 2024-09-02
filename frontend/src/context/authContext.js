import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem("chat-user")
      ? JSON.parse(localStorage.getItem("chat-user"))
      : null
  );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
