import { NavLink, Outlet } from "react-router-dom";
import { Settings, User, Shield } from "lucide-react";

const links = [
  { name: "General", path: "/settings/general", icon: Settings },
  { name: "Profile", path: "/settings/profile", icon: User },
  { name: "Account", path: "/settings/account", icon: Shield },
];

export default function SettingsLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <div className="flex max-w-6xl mx-auto px-6 py-10 gap-10">
        
        {/* Sidebar */}
        <aside className="w-56 shrink-0">
          <div className="sticky top-10">
            
            <h2 className="text-sm font-semibold text-muted-foreground mb-4 tracking-wide">
              Settings
            </h2>

            <nav className="flex flex-col gap-1">
              {links.map((link) => {
                const Icon = link.icon;

                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`
                    }
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>

                    {/* Active indicator line */}
                    {({ isActive }) =>
                      isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                      )
                    }
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1">
          <div className="p-2">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}