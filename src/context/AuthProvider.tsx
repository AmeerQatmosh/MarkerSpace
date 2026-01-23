import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Invalid token");
      const profile = await res.json();
      setUser(profile);
      setIsAuthenticated(true);
    } catch (err) {
      logout();
    }
  };

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json();
      if (res.ok && data.token) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", data.token);
        setToken(data.token);
        fetchUserProfile(data.token);
        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
