import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/markspace_logo.png";
import { Folder, ChartNetwork, Notebook, Focus, Menu } from "lucide-react";

import Notification from "@/components/Notifications/Notification";
import ProfileMenu from "@/components/Profile/ProfileMenu";
import { ModeToggle } from "@/components/mode-toggle";
// import { NavbarSearch } from "@/components/navbar-search"
import { CommandSearch } from "@/components/command-search";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  user: any | null;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
}

const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  const guestLinks = [
    { name: "Features", path: "/#features" },
    { name: "Pricing", path: "/#pricing" },
    { name: "About", path: "/#about" },
    { name: "FAQ", path: "/#faq" },
    { name: "Contact", path: "/#contact" },
  ];

  const userLinks = [
    { name: "Collections", path: "/collections", icon: Folder },
    { name: "Insights", path: "/insights", icon: ChartNetwork },
    { name: "Notes", path: "/notes", icon: Notebook },
    { name: "Focus", path: "/focus", icon: Focus },
  ];

  return (
    <header
      className={`
        top-0 z-50 w-full transition-all
        ${scrolled ? "fixed bg-card" : "bg-card"}
      `}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="PickCart" className="h-9 w-9" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {(user ? userLinks : guestLinks).map((link) => {
            const Icon = "icon" in link ? link.icon : null;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  flex items-center gap-1 text-sm font-medium transition-colors
                  ${
                    isActive(link.path)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {/* <NavbarSearch /> */}
              <CommandSearch />
              <Notification />
              <ProfileMenu
                avatar={user?.avatar}
                username={user?.username}
                onLogout={handleLogout}
              />
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
              >
                Get Started
              </Link>
            </>
          )}
          <ModeToggle />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 pt-10">
              <div className="mt-6 flex flex-col gap-4">
                {(user ? userLinks : guestLinks).map((link) => {
                  const Icon = "icon" in link ? link.icon : null;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`
                        flex items-center gap-2 rounded-md px-3 py-2 text-sm
                        ${
                          isActive(link.path)
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }
                      `}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {link.name}
                    </Link>
                  );
                })}

                {!user && (
                  <>
                    <Link
                      to="/signin"
                      className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                <div className="pt-4 border-t">
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
