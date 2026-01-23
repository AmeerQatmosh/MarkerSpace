import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AvatarURL from "@/assets/default_avatar.jpg";

const ProfileMenu = () => {
  const [user, setUser] = useState<{ avatar?: string; fullName?: string } | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

  const handleUserUpdate = () => {
    const updated = localStorage.getItem("user");
    if (updated) setUser(JSON.parse(updated));
  };

  window.addEventListener("userUpdated", handleUserUpdate);

  return () => window.removeEventListener("userUpdated", handleUserUpdate);
}, []);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent" size="icon" title={user?.fullName || "User"}>
          <img
            src={user?.avatar || AvatarURL }  // <-- changed from avatarUrl
            alt={user?.fullName || "Profile"}
            className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="p-2">
        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" /> Profile
          </DropdownMenuItem>
        </Link>

        <Link to="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="cursor-pointer text-amber-500 focus:text-amber-500 focus:bg-amber-200" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4 text-amber-500 " /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
