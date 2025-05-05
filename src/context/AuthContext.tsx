import { createContext, ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import client from "../api/client";
import { AuthContextType, JwtPayload } from "../interfaces/Authentication";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<JwtPayload | null>(null);
  // UseEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = jwtDecode<JwtPayload>(token);
        setToken(token);
        setUser(payload);
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);
  // Login
  const login = (newToken: string) => {
    const payload = jwtDecode<JwtPayload>(newToken);
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(payload);
  };
  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };
  // Providing Context
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
