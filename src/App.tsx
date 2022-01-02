import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { UserContext } from "./UserContext";
import { getUser } from "./api/users";
import AdminPage from "./pages/AdminPage/AdminPage";
import { User } from "../src/types/user.interface";

export default function App() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  useEffect(() => {
    async function updateUser() {
      if (loggedInUser) {
        const user = await getUser(loggedInUser._id);
        if (user) {
          setLoggedInUser(user);
        }
      }
    }
    updateUser();
  }, [getUser, setLoggedInUser]);

  return (
    <>
      {loggedInUser ? (
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/home" />} />
          {loggedInUser.role === "Admin" && (
            <Route path="/admin" element={<AdminPage />} />
          )}
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}
