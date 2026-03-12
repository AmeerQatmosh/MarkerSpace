import React from "react";

interface BlogPageProps {
  title: string;
  content: React.ReactNode;
}

const BlogPage: React.FC<BlogPageProps> = ({ title, content }) => {
  return (
    <div className="min-h-screen p-8 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center">{title}</h1>

        {/* Divider */}
        <div className="border-b border-border w-24 mx-auto" />

        {/* Content */}
        <div className="space-y-4 text-foreground text-base leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
