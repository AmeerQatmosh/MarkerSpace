// // // // components/NavigationWrapper.tsx
// // // import { useLocation } from "react-router-dom";
// // // import NavbarComponent from "./Navbar";
// // // import GuestNavbarComponent from "./GuestNavbar";

// // // const publicRoutes = ["/","/about", "/contact","/features", "/privacy-policy", "/terms-of-use","/signin", "/signup","/resetpassword"];

// // // const NavigationWrapper = ({ token }: { token: string | null }) => {
// // //   const location = useLocation();
// // //   // const isAuthPages = ["/signin", "/signup"].includes(location.pathname);
// // //   const isAuthenticated = Boolean(token);
// // //   const isPublicRoute = publicRoutes.includes(location.pathname);

// // //   // if (isAuthPages) return null;

// // //   if(isAuthenticated && !isPublicRoute) {
// // //     return <NavbarComponent />
// // //   }
// // //   return <GuestNavbarComponent />
// // // };

// // // export default NavigationWrapper;

// // import { useLocation } from "react-router-dom";
// // import Navbar from "./Navbar";

// // const publicRoutes = ["/","/about", "/contact","/features", "/privacy-policy", "/terms-of-use","/signin", "/signup","/resetpassword"];

// // const NavigationWrapper = ({ token, setUser }: { token: string | null; setUser: React.Dispatch<any> }) => {
// //   const location = useLocation();
// //   const isAuthenticated = Boolean(token);
// //   const isPublicRoute = publicRoutes.includes(location.pathname);

// //   return <Navbar user={isAuthenticated ? { token } : null} setUser={setUser} />;
// // };

// // export default NavigationWrapper;

// import { useLocation } from "react-router-dom";
// import Navbar from "./Navbar";

// const publicRoutes = [
//   "/", "/about", "/contact", "/features",
//   "/privacy-policy", "/terms-of-use",
//   "/signin", "/signup", "/resetpassword"
// ];

// const authPages = ["/signin", "/signup", "/resetpassword"];

// const NavigationWrapper = ({
//   token,
//   setUser,
// }: {
//   token: string | null;
//   setUser: React.Dispatch<any>;
// }) => {
//   const location = useLocation();
//   const isAuthenticated = Boolean(token);

//   // If we're on an auth page, don't render the navbar
//   if (authPages.includes(location.pathname)) return null;

//   // Render navbar only for authenticated users or public routes
//   return <Navbar user={isAuthenticated ? { token } : null} setUser={setUser} />;
// };

// export default NavigationWrapper;


import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const publicRoutes = [
  "/", "/about", "/contact", "/features",
  "/privacy-policy", "/terms-of-use",
  "/signin", "/signup", "/resetpassword"
];

const authPages = ["/signin", "/signup", "/resetpassword"];

const NavigationWrapper = ({
  token,
  setUser,
}: {
  token: string | null;
  setUser: React.Dispatch<any>;
}) => {
  const location = useLocation();

  // Hide navbar on auth pages
  if (authPages.includes(location.pathname)) return null;

  const isAuthenticated = Boolean(token);
  return <Navbar user={isAuthenticated ? { token } : null} setUser={setUser} />;
};

export default NavigationWrapper;

