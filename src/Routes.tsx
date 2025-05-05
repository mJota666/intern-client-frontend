import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import Login from "./pages/Authentications/LoginPage";
import Register from "./pages/Authentications/RegisterPage";
import ContentPage from "./pages/ContentPage";
import ProfilePage from "./pages/Users/ProfilePage";

export default function AppRoutes() {
  const { user } = useContext(AuthContext)!;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected routes */}
        <Route
          path="/*"
          element={user ? <Authenticated /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function Authenticated() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/article/:id" element={<ContentPage />} />
      {/* Redirect unknown to homepage */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
