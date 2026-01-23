// import { Form, Button, FormControl } from "react-bootstrap";

// function UserProfile() {
//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4">
//       <div className="max-w-4xl mx-auto space-y-12">
//         {/* Header */}
//         <div className="space-y-2">
//           <h1 className="text-3xl font-semibold">Your Profile</h1>
//           <p className="text-gray-600 dark:text-gray-400 text-sm">
//             Update your account information below.
//           </p>
//         </div>

//         {/* Profile Section */}
//         <div className="grid md:grid-cols-3 gap-6 items-start">
//           {/* Profile Image */}
//           <div className="flex flex-col items-center md:items-start gap-4">
//             <img
//               src="https://via.placeholder.com/120"
//               alt="Avatar"
//               className="w-28 h-28 rounded-full object-cover"
//             />
//             <Button variant="outline-secondary" className="text-sm">
//               Change Photo
//             </Button>
//           </div>

//           {/* Profile Form */}
//           <div className="md:col-span-2 space-y-6">
//             <Form className="space-y-4">
//               {/* Full Name */}
//               <div>
//                 <label
//                   htmlFor="fullName"
//                   className="block text-sm font-medium mb-1"
//                 >
//                   Full Name
//                 </label>
//                 <FormControl
//                   id="fullName"
//                   type="text"
//                   defaultValue="John Doe"
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2"
//                 />
//               </div>

//               {/* Username */}
//               <div>
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium mb-1"
//                 >
//                   Username
//                 </label>
//                 <FormControl
//                   id="username"
//                   type="text"
//                   defaultValue="john_doe"
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium mb-1"
//                 >
//                   Email
//                 </label>
//                 <FormControl
//                   id="email"
//                   type="email"
//                   defaultValue="user@example.com"
//                   readOnly
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 p-2 cursor-not-allowed"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium mb-1"
//                 >
//                   New Password
//                 </label>
//                 <FormControl
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2"
//                 />
//               </div>

//               {/* Save Button */}
//               <div className="pt-4">
//                 <Button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//                 >
//                   Save Changes
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;


// import { useState, useEffect } from "react";
// import { Form, Button, FormControl } from "react-bootstrap";

// // Dummy example of getting user from context or storage
// function useCurrentUser() {
//   // Try context or fallback to localStorage/sessionStorage
//   // Replace with your actual user fetching logic
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Example: Try to get user from localStorage/sessionStorage
//     const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       // Could fetch user from API here or set default empty user
//       setUser(null);
//     }
//   }, []);

//   return user;
// }

// function UserProfile() {
//   const user = useCurrentUser();

//   // Show loading or empty state if user is not available
//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
//         Loading user data...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4">
//       <div className="max-w-4xl mx-auto space-y-12">
//         {/* Header */}
//         <div className="space-y-2">
//           <h1 className="text-3xl font-semibold">Your Profile</h1>
//           <p className="text-gray-600 dark:text-gray-400 text-sm">
//             Update your account information below.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6 items-start">
//           {/* Profile Image */}
//           <div className="flex flex-col items-center md:items-start gap-4">
//             <img
//               src={user.avatar || "https://via.placeholder.com/120"}
//               alt="Avatar"
//               className="w-28 h-28 rounded-full object-cover"
//             />
//             <Button variant="outline-secondary" className="text-sm">
//               Change Photo
//             </Button>
//           </div>

//           {/* Profile Form */}
//           <div className="md:col-span-2 space-y-6">
//             <Form className="space-y-4">
//               {/* Full Name */}
//               <div>
//                 <label htmlFor="fullName" className="block text-sm font-medium mb-1">
//                   Full Name
//                 </label>
//                 <FormControl
//                   id="fullName"
//                   type="text"
//                   defaultValue={user.fullName || ""}
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2"
//                 />
//               </div>

//               {/* Username */}
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium mb-1">
//                   Username
//                 </label>
//                 <FormControl
//                   id="username"
//                   type="text"
//                   defaultValue={user.username || ""}
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium mb-1">
//                   Email
//                 </label>
//                 <FormControl
//                   id="email"
//                   type="email"
//                   defaultValue={user.email || ""}
//                   readOnly
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 p-2 cursor-not-allowed"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium mb-1">
//                   New Password
//                 </label>
//                 <FormControl
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2"
//                 />
//               </div>

//               {/* Save Button */}
//               <div className="pt-4">
//                 <Button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//                 >
//                   Save Changes
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;


// import { useState, useEffect } from "react";
// import { Form, Button, FormControl } from "react-bootstrap";

// function UserProfile() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Try localStorage first (remember me = true)
//     let storedUser = localStorage.getItem("user");
//     if (!storedUser) {
//       // Try sessionStorage (remember me = false)
//       storedUser = sessionStorage.getItem("user");
//     }
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       setUser(null);
//     }
//   }, []);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
//         No user data found. Please log in.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4">
//       <div className="max-w-4xl mx-auto space-y-12">
//         {/* Header */}
//         <div className="space-y-2">
//           <h1 className="text-3xl font-semibold">Your Profile</h1>
//           <p className="text-gray-600 dark:text-gray-400 text-sm">
//             Update your account information below.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-6 items-start">
//           {/* Profile Image */}
//           <div className="flex flex-col items-center md:items-start gap-4">
//             <img
//               src={user.avatar || "https://via.placeholder.com/120"}
//               alt="Avatar"
//               className="w-28 h-28 rounded-full object-cover"
//             />
//             <Button variant="outline-secondary" className="text-sm">
//               Change Photo
//             </Button>
//           </div>

//           {/* Profile Form */}
//           <div className="md:col-span-2 space-y-6">
//             <Form className="space-y-4">
//               {/* Full Name */}
//               <div>
//                 <label htmlFor="fullName" className="block text-sm font-medium mb-1">
//                   Full Name
//                 </label>
//                 <FormControl
//                   id="fullName"
//                   type="text"
//                   defaultValue={user.fullName || ""}
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2"
//                 />
//               </div>

//               {/* Username */}
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium mb-1">
//                   Username
//                 </label>
//                 <FormControl
//                   id="username"
//                   type="text"
//                   defaultValue={user.username || ""}
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium mb-1">
//                   Email
//                 </label>
//                 <FormControl
//                   id="email"
//                   type="email"
//                   defaultValue={user.email || ""}
//                   readOnly
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 p-2 cursor-not-allowed"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium mb-1">
//                   New Password
//                 </label>
//                 <FormControl
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2"
//                 />
//               </div>

//               {/* Save Button */}
//               <div className="pt-4">
//                 <Button
//                   type="submit"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//                 >
//                   Save Changes
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserProfile;

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function UserProfile() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    avatarUrl: "",
  });
  const [password, setPassword] = useState("");

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    const localUser = localStorage.getItem("user");
    const storedUser = sessionUser || localUser;
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call backend API to update user info here

    // Update storage after successful update
    const storage = localStorage.getItem("user") ? localStorage : sessionStorage;
    storage.setItem("user", JSON.stringify(user));

    alert("Profile updated!");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Your Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Update your account information below.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Profile Image */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src={user.avatarUrl || "https://via.placeholder.com/120"}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover"
            />
            <Button variant="outline" size="sm">
              Change Photo
            </Button>
          </div>

          {/* Profile Form */}
          <div className="md:col-span-2 space-y-6">
            <form onSubmit={handleSave} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={user.fullName}
                  onChange={handleChange}
                />
              </div>

              {/* Username */}
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  readOnly
                  className="cursor-not-allowed"
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
