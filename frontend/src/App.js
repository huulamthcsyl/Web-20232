import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import Layout from "./Layout";
import Profile from "./Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
