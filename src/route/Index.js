import React, { useLayoutEffect } from "react";
import { Routes,Route, useLocation } from "react-router-dom";

import ProjectCardPage from "../pages/pre-built/projects/ProjectCard";
import RegisterNewUserPage from "../pages/pre-built/projects/Registeration";
import MainScreenPage from "../pages/pre-built/projects/MainScreen";

import Error404Modern from "../pages/error/404-modern";
import Error504Modern from "../pages/error/504-modern";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Success from "../pages/auth/Success";

import Layout from "../layout/Index";
import LayoutNoSidebar from "../layout/Index-nosidebar";
import WriterScreenPage from "../pages/pre-built/projects/WriterScreen";
import CreateNewEvent from "../pages/pre-built/projects/CreateEvent";
import ViewWriters from "../pages/pre-built/projects/ViewWriters";
import RegisterNewGlossaryWriterPage from "../pages/pre-built/projects/GlossaryRegisteration";
import ViewGlossary from "../pages/pre-built/projects/ViewGlossaryWriters";
import GlossaryWriterScreenPage from "../pages/pre-built/projects/GlossaryWriterScreen";

const Router = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}`} element={<Layout />}>
          <Route path="admin" element={<ProjectCardPage />}></Route>
          <Route path="writer-screen" element={<WriterScreenPage />}></Route>
          <Route path="add-writer" element={<RegisterNewUserPage />}></Route>
          <Route path="create-event" element={<CreateNewEvent />}></Route>
          <Route path="view-writers" element={<ViewWriters />}></Route>
          <Route path="add-glossary-writer" element={<RegisterNewGlossaryWriterPage />}></Route>
          <Route path="view-glossary-writer" element={<ViewGlossary />}></Route>
          <Route path="glossary-writer-screen" element={<GlossaryWriterScreenPage />}></Route>
          <Route index element={<MainScreenPage/>}></Route>
        </Route>
        <Route path={`${process.env.PUBLIC_URL}`} element={<LayoutNoSidebar />}>
          <Route path="auth-success" element={<Success />}></Route>
            <Route path="auth-reset" element={<ForgotPassword />}></Route>
            <Route path="auth-register" element={<Register />}></Route>
            <Route path="auth-login" element={<Login />}></Route>

            <Route path="errors">
              <Route path="404-modern" element={<Error404Modern />}></Route>
              <Route path="504-modern" element={<Error504Modern />}></Route>
            </Route>
            <Route path="*" element={<Error404Modern />}></Route>
        </Route>
      </Routes>
  );
};
export default Router;
