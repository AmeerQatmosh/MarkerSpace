// NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 min-h-screen bg-background text-foreground transition-colors duration-300">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6 text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="border border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
        Go Back Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
