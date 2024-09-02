import "./App.css";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";
import useToken from "./hooks/useToken";

function App() {
  const { user } = useAuthContext();
  const token = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user && token ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user && token ? <Navigate to="/home" /> : <SignUp />}
        />
        <Route
          path="/home"
          element={user && token ? <Home /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
