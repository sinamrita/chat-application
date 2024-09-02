import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SocketContextProvider } from "./context/socketContext";
import { NotificationProvider } from "./context/notificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthContextProvider>
      <SocketContextProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </Provider>
);
