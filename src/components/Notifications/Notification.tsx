// components/Notification.tsx
import { useState } from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

const Notification = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setOpen(!open)}
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-md"
      >
        <Bell className="h-4 w-4" />
        <span className="sr-only">Notification</span>
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-card text-card-foreground border border-border shadow-md transition-colors duration-300 rounded-lg">
          <div className="p-4 text-sm text-gray-600 dark:text-gray-100">
            There is no new notifications
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
