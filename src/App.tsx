import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* =======================
   Pages
======================= */
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Insights from "./pages/Insights";
import Notes from "./pages/Notes";
import Focus from "./pages/Focus";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/userProfile";

import Account from "./pages/User/Account";
import Profile from "./pages/User/Profile";
import Settings from "./pages/User/Settings";

import { ThemeProvider } from "@/components/theme-provider"

/* =======================
   Auth Pages
======================= */
import SignIn from "@/pages/auth/Signin";
import SignUp from "@/pages/auth/Signup";

/* =======================
   Components
======================= */
import ForgetPassword from "./components/Forms/forgotpassword";
import ResetPassword from "./components/Forms/ResetPassword";
import Contact from "./components/Contact/contact";
import About from "./components/About/about";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfUse from "./pages/terms-of-use";
import Footer from "./components/Layout/Footer/footer";
import NavigationWrapper from "./components/Layout/Navbar/NavigationWrapper";
import ScrollToTop from "./components/ScrollToTop";
import { ScrollToHash } from "@/components/ScrollToHash";

/* =======================
   Error Pages
======================= */
import NoResultsFound from "./pages/Error/noResultsFound";
import NotFoundPage from "./pages/Error/NotFoundPage";

/* =======================
   Auth Context
======================= */
import { AuthProvider, useAuth } from "./context/AuthContext";

/* =======================
   Types
======================= */
interface Name {
  _id: string;
  name: string;
}

/* =======================
   Protected Route
======================= */
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/signin" replace />;
}

/* =======================
   App Routes (inside AuthProvider)
======================= */
function AppRoutes() {
  const { token, setToken } = useAuth();

  /* ---------- State ---------- */
  const [name, setName] = useState("");
  const [names] = useState<Name[]>([]); // preserved (unused but not removed)
  const [profile, setProfile] = useState<{ email: string } | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  /* ---------- Effects ---------- */
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [token]);

  /* ---------- Handlers ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      console.log(data.message);
      setName("");
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const res = await fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, priority }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");
    }
  };

  const authPages = ["/signin", "/signup", "/resetpassword"];
  const location = useLocation();

  /* ---------- Render ---------- */
  return (
    <>
      <ScrollToTop />
      <NavigationWrapper token={token} />
      <ScrollToHash />
      <Routes>
        {/* Public */}
        <Route
          path="/"
          element={token ? <Navigate to="/home" replace /> : <LandingPage />}
        />
        <Route
          path="/signin"
          element={token ? <Navigate to="/home" replace /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/home" replace /> : <SignUp />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/resetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ForgetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />


        {/* Home */}
        <Route
          path="/home"
          element={
            token ? (
              <Home
                name={name || null}
                setName={setName}
                handleSubmit={handleSubmit}
                token={token}
                profile={profile}
                setToken={setToken}
                title={title}
                description={description}
                priority={priority}
                setTitle={setTitle}
                setDescription={setDescription}
                setPriority={setPriority}
                handleCreate={handleCreate}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* Protected */}
        <Route path="/collections" element={<ProtectedRoute><Collections /></ProtectedRoute>} />
        <Route path="/collections/:collectionName" element={<ProtectedRoute><Collections /></ProtectedRoute>} />
        <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/focus" element={<ProtectedRoute><Focus/></ProtectedRoute>} />

        {/* User */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/userprofile" element={<ProtectedRoute><UserProfile profile={profile} /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

        {/* Errors */}
        <Route path="/no-results-found" element={<NoResultsFound />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!authPages.includes(location.pathname) && <Footer />}
    </>
  );
}

/* =======================
   App Root
======================= */
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <div className="min-h-screen transition-colors duration-300">
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </div>
    </ThemeProvider>
  );
}

export default App;
