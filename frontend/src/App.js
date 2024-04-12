import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Profile from "./Profile";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./PrivateRoute";
import SetupAccount from "./SetupAccount";
import DetailPost from "./DetailPost";
import NewFeeds from "./Home/NewFeeds";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/setup-account" element={<SetupAccount />} />
        <Route path="/login" element={<Login />} />
        // Redirect to login page if user is not logged in
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<NewFeeds />} />
          <Route path="profile/:id" element={<Profile />}/>
          <Route path="/post/:id" element={<DetailPost />} />
        </Route>
      </Routes>
      <ToastContainer hideProgressBar />
    </BrowserRouter>
  );
}

export default App;
