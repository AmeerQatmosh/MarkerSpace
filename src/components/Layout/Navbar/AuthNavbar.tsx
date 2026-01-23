import { Link } from "react-router-dom";
import logo from "@/assets/markspace_logo.png";
import { ModeToggle } from "@/components/mode-toggle";

const AuthNavbar = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MarkerSpace Logo" className="h-8 w-8" />
        </Link>

        {/* Theme Toggle */}
        <ModeToggle />
      </div>
    </header>
  );
};

export default AuthNavbar;
