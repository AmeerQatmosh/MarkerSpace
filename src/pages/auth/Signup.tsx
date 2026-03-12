// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// function SignUp() {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, username, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("✅ " + data.message);
//         localStorage.setItem("token", data.token); // optional
//         navigate("/signin");
//       } else {
//         setMessage("❌ " + data.message);
//       }
//     } catch (err) {
//       setMessage("❌ Something went wrong.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground transition-colors duration-300">
//       <Card className="w-full max-w-md p-8 rounded-lg space-y-6 bg-card text-card-foreground border border-border shadow-md transition-colors duration-300">
//         <CardHeader>
//           <CardTitle className="text-3xl text-center">
//             Sign Up
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleRegister} className="space-y-5">
//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email Address</Label>
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

//             {/* Username */}
//             <div className="space-y-2">
//               <Label htmlFor="username">User Name</Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="User Name"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//                 className="border border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring focus:ring-1 transition-colors duration-300"
//               />
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
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

//             {/* Submit */}
//             <Button type="submit" className="w-full border border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
//               Sign Up
//             </Button>

//             {message && (
//               <p className="text-sm text-center">{message}</p>
//             )}

//             <p className="text-center text-sm">
//               Already have an account? {""}
//               <Link
//                 to="/signin"
//                 className="text-primary hover:underline transition-colors duration-300"
//               >
//                 Sign In
//               </Link>
//             </p>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default SignUp;

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/markspace_logo.png";
import { ModeToggle } from "@/components/mode-toggle";
import { PasswordInput } from "@/components/PasswordInput";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ " + data.message);
        localStorage.setItem("token", data.token); // optional
        navigate("/signin");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground transition-colors duration-300 relative overflow-hidden">
      {/* Right Panel / Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        {/* Logo + Theme Toggle */}
        <div className="flex items-center justify-between w-full max-w-md mb-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="MarkerSpace Logo"
              className="h-10 w-10 object-contain"
            />
          </Link>
          <ModeToggle />
        </div>

        {/* SignUp Form Card */}
        <Card className="w-full max-w-md p-8 rounded-2xl space-y-6 bg-card text-card-foreground border border-border shadow-xl transition-colors duration-300">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Sign Up</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
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

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Full Name</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring focus:ring-1 transition-colors duration-300"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-ring focus:ring-1 transition-colors duration-300"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full border border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
              >
                Sign Up
              </Button>

              {message && <p className="text-sm text-center">{message}</p>}

              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-primary hover:underline transition-colors duration-300"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Left Panel / Hero / Info */}
      <div
        className="hidden md:flex flex-1 flex-col justify-center p-12 relative
        bg-linear-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 transition-colors duration-500
      "
      >
        {/* Blurred decorative shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-green-300/30 dark:bg-green-800/20 filter blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-300/30 dark:bg-blue-800/20 filter blur-3xl"></div>

        {/* Logo + tagline */}
        <div className="mb-8 flex items-center gap-2 z-10 relative">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="MarkerSpace Logo"
              className="h-10 w-10 object-contain"
            />
          </Link>
          <span className="font-bold text-3xl text-foreground">
            MarkerSpace
          </span>
        </div>

        {/* Welcome message */}
        <h1 className="text-4xl font-bold mb-4 z-10 relative">Join Us!</h1>
        <p className="text-muted-foreground text-lg z-10 relative">
          Create your account to start organizing your work, taking notes, and
          staying productive.
        </p>

        {/* Optional extra info */}
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground z-10 relative">
          <li>✅ Organize your work efficiently</li>
          <li>✅ Collaborate with your team</li>
          <li>✅ Stay focused and productive</li>
        </ul>
      </div>
    </div>
  );
}

export default SignUp;
