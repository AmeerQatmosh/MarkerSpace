import React, { createContext, useState, ReactNode, useContext } from "react";

interface AuthContextType {
  loginEmail: string;
  loginPassword: string;
  loginMessage: string;
  token: string | null;
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
  setLoginMessage: (msg: string) => void;
  setToken: (token: string | null) => void;
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const getStoredToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [token, setToken] = useState<string | null>(getStoredToken());

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setToken(data.token);
        if (rememberMe) {
          localStorage.setItem("token", data.token);
          sessionStorage.removeItem("token");
        } else {
          sessionStorage.setItem("token", data.token);
          localStorage.removeItem("token");
        }

        setLoginEmail("");
        setLoginPassword("");
        setLoginMessage("Login successful!");
        return { success: true };
      } else {
        setLoginMessage(data.message || "Login failed.");
        return { success: false, message: data.message || "Login failed." };
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginMessage("Server error");
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loginEmail,
        loginPassword,
        loginMessage,
        token,
        setLoginEmail,
        setLoginPassword,
        setLoginMessage,
        setToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
