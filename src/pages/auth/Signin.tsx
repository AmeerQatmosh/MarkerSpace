
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import logo from "@/assets/markspace_logo.png";
// import { ModeToggle } from "@/components/mode-toggle";

// function SignIn() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = await login(email, password, rememberMe);

//     if (result.success) {
//       navigate("/home");
//     } else {
//       setError(result.message || "Login failed.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground transition-colors duration-300">
//       {/* Logo + Theme Toggle */}
//       <div className="flex items-center justify-between w-full max-w-md mb-6">
//         <Link to="/" className="flex items-center gap-2">
//           <img src={logo} alt="MarkSpace Logo" className="h-8 w-8" />
//           <span className="font-semibold text-lg">MarkSpace</span>
//         </Link>
//         <ModeToggle />
//       </div>

//       {/* SignIn Form Card (unchanged) */}
//       <Card className="w-full max-w-md p-8 rounded-lg space-y-6 bg-card text-card-foreground border border-border shadow-md transition-colors duration-300">
//         <CardHeader>
//           <CardTitle className="text-3xl text-center">Sign in</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             {/* Email Input */}
//             <div className="space-y-1">
//               <Label htmlFor="email">Email address</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="name@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="border border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring focus:ring-1 transition-colors duration-300"
//               />
//             </div>

//             {/* Password Input */}
//             <div className="space-y-1">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="border border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring focus:ring-1 transition-colors duration-300"
//               />
//             </div>

//             {/* Remember & Forgot */}
//             <div className="flex items-center justify-between text-sm">
//               <Label htmlFor="remember-me" className="flex items-center space-x-2">
//                 <Checkbox
//                   id="remember-me"
//                   checked={rememberMe}
//                   onCheckedChange={(checked) => setRememberMe(!!checked)}
//                   className="cursor-pointer"
//                 />
//                 <span>Remember Me</span>
//               </Label>
//               <Link
//                 to="/resetpassword"
//                 className="text-primary hover:underline transition-colors duration-300"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* Sign In Button */}
//             <Button
//               type="submit"
//               className="w-full border border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
//               Sign In
//             </Button>

//             {/* Error Message */}
//             {error && <p className="text-destructive text-center mt-2">{error}</p>}

//             {/* Sign Up Link */}
//             <p className="text-center text-sm">
//               Don't have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="text-primary hover:underline transition-colors duration-300"
//               >
//                 Sign Up
//               </Link>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default SignIn;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import logo from "@/assets/markspace_logo.png";
import { ModeToggle } from "@/components/mode-toggle";

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password, rememberMe);

    if (result.success) {
      navigate("/home");
    } else {
      setError(result.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground transition-colors duration-300 relative overflow-hidden">
      
      {/* Left Panel / Hero / Info */}
      <div
        className="hidden md:flex flex-1 flex-col justify-center p-12 relative
        bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 transition-colors duration-500
      ">
        {/* Blurred decorative shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-green-300/30 dark:bg-green-800/20 filter blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-300/30 dark:bg-blue-800/20 filter blur-3xl"></div>

        {/* Logo + tagline */}
        <div className="mb-8 flex items-center gap-2 z-10 relative">
          <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MarkerSpace Logo" className="h-10 w-10 object-contain" />
          </Link>
          <span className="font-bold text-3xl text-foreground">MarkerSpace</span>
        </div>

        {/* Welcome message */}
        <h1 className="text-4xl font-bold mb-4 z-10 relative">Welcome Back!</h1>
        <p className="text-muted-foreground text-lg z-10 relative">
          Sign in to your account to access your collections, notes, insights, and more.
        </p>

        {/* Optional extra info */}
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground z-10 relative">
          <li>✅ Organize your work efficiently</li>
          <li>✅ Collaborate with your team</li>
          <li>✅ Stay focused and productive</li>
        </ul>
      </div>

      {/* Right Panel / Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        {/* Logo + Theme Toggle always visible */}
        <div className="flex items-center justify-between w-full max-w-md mb-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="MarkerSpace Logo" className="h-10 w-10 object-contain" />
          </Link>
          <ModeToggle />
        </div>

        {/* SignIn Form Card */}
        <Card className="w-full max-w-md p-8 rounded-2xl space-y-6 bg-card text-card-foreground border border-border shadow-xl transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Sign in</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring focus:ring-1 transition-colors duration-300"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring focus:ring-1 transition-colors duration-300"
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <Label htmlFor="remember-me" className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <span>Remember Me</span>
                </Label>
                <Link
                  to="/resetpassword"
                  className="text-primary hover:underline transition-colors duration-300"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full border border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
                Sign In
              </Button>

              {/* Error Message */}
              {error && <p className="text-destructive text-center mt-2">{error}</p>}

              {/* Sign Up Link */}
              <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:underline transition-colors duration-300"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;
