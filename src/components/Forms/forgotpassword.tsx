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

// function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);
//     setError(null);
//     setLoading(true);

//     try {
//       const res = await fetch(
//         "http://localhost:5000/api/reset-password-request",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email }),
//         }
//       );

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(data.message || "Reset link sent! Check your email.");
//       } else {
//         setError(data.message || "Failed to send reset link.");
//       }
//     } catch {
//       setError("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground transition-colors duration-300">
//       <Card className="w-full max-w-md p-8 rounded-lg space-y-6 bg-card text-card-foreground border border-border shadow-md transition-colors duration-300">
//         <CardHeader>
//           <CardTitle className="text-3xl text-center">
//             Reset your password
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <div
//             className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-3 mb-4 rounded"
//             role="alert"
//           >
//             <p className="font-bold">Forgetting your password?</p>
//             <p className="text-sm">
//               Enter your email address below and we'll send you a link
//               to reset it.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div className="space-y-2">
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

//             {/* Submit */}
//             <Button
//               type="submit"
//               className="w-full border border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
//               disabled={loading}
//             >
//               {loading ? "Sending..." : "Reset Password"}
//             </Button>

//             {message && (
//               <p className="text-green-600 text-sm text-center">
//                 {message}
//               </p>
//             )}

//             {error && (
//               <p className="text-red-600 text-sm text-center">
//                 {error}
//               </p>
//             )}
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default ForgotPassword;


import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from "@/assets/markspace_logo.png";
import { ModeToggle } from "@/components/mode-toggle";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/reset-password-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Reset link sent! Check your email.");
      } else {
        setError(data.message || "Failed to send reset link.");
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background text-foreground transition-colors duration-300">
      
      {/* Logo + Theme Switch */}
      <div className="flex items-center justify-between w-full max-w-md mb-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MarkSpace Logo" className="h-10 w-10 object-contain" />
          <span className="font-bold text-2xl">MarkerSpace</span>
        </Link>
        <ModeToggle />
      </div>

      {/* Reset Password Card */}
      <Card className="w-full max-w-md p-8 rounded-2xl space-y-6 bg-card text-card-foreground border border-border shadow-xl transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Reset your password
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-3 mb-4 rounded"
            role="alert"
          >
            <p className="font-bold">Forgetting your password?</p>
            <p className="text-sm">
              Enter your email address below and we'll send you a link
              to reset it.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
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

            {/* Submit */}
            <Button
              type="submit"
              className="w-full border border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? "Sending..." : "Reset Password"}
            </Button>

            {message && (
              <p className="text-green-600 text-sm text-center">
                {message}
              </p>
            )}

            {error && (
              <p className="text-red-600 text-sm text-center">
                {error}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotPassword;
