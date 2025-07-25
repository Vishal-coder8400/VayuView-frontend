import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { stateConnected } from "./utils/redux_tools";

import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import OTPVerify from "./Components/OTPVerify";
import WorkspaceBuilder from "./Components/WorkspaceBuilder";
import Dashboard from "./Components/Dashboard";
import FileManager from "./Components/Dashboard/FileManager";
import Creator from "./Components/Creator";
import ContactUs from "./Components/ContactUs";
import PreviewV2 from "./Components/Preview/PreviewV2";

const Routing = ({ auth }) => {
  const isLoggedIn = !!auth?.token;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<OTPVerify />} />
      <Route path="/contact-us" element={<ContactUs />} />

      {/* Protected Routes */}
      {isLoggedIn && (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/creator/:id" element={<Creator />} />
          <Route path="/preview/:id" element={<PreviewV2 />} />
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/workspace" element={<WorkspaceBuilder />} />
        </>
      )}

      {/* Fallback */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
    </Routes>
  );
};

export default stateConnected(Routing);
