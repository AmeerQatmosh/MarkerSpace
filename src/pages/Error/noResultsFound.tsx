import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const NoResultsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 min-h-screen bg-background text-foreground transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-4">No Results Found</h1>
      <p className="mb-8">
        Sorry, we couldn't find anything matching your search.
      </p>
      <Link to="/">
      <Button className="border border-border bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300">
        Go back to homepage
      </Button>
      </Link>
    </div>
  );
};

export default NoResultsFound;
