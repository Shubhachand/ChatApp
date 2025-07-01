import React from "react";
import { Navigate, Route, Routes } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import { Toaster } from "react-hot-toast";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
import FriendsPage from "./pages/FriendsPage.jsx";


const App = () => {
  // tanstack query crash course
  const { isLoading, authUser } = useAuthUser();
  const {theme,setTheme} = useThemeStore();

  if (isLoading)
    return (
      <div>
        <PageLoader />
      </div>
    );
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  return (
    <div className="min-h-screen overflow-y-auto text-2xl" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout  showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
          <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/notifications"
          element={
           isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
           ) : (
              <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
           )
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated && !isOnboarded ? (
              <OnboardingPage />
            ) : (
              <Navigate to={isAuthenticated ? "/" : "/login"} />
            )
          }
        />
        <Route 
          path="/friends"
          element={
             isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <FriendsPage />
              </Layout>
           ) : (
              <Navigate to={isAuthenticated ? "/onboarding" : "/login"} />
           )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
