import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";

interface Bookmark {
  _id: string;
  title: string;
  url: string;
  tags: string[];
  notes?: string;
  isFocus?: boolean;
}

interface BookmarkCardProps {
  bookmark: Bookmark;
  getFavicon: (url: string) => string;
  onEdit: (bookmark: Bookmark) => void;
  onDelete: (id: string) => void;
}

const BookmarkCard = ({
  bookmark,
  getFavicon,
  onEdit,
  onDelete,
}: BookmarkCardProps) => {
  return (
    <Card
      className={`p-4 rounded-xl shadow-none border border-border bg-card ${
        bookmark.isFocus ? "border-yellow-400" : ""
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={getFavicon(bookmark.url)}
            alt="favicon"
            className="w-6 h-6"
          />

          <CardTitle className="text-lg font-semibold">
            <a
              href={
                bookmark.url.startsWith("http")
                  ? bookmark.url
                  : `https://${bookmark.url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-primary"
            >
              {bookmark.title}
            </a>
          </CardTitle>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Open options menu"
              size="icon"
              variant="outline"
              className="cursor-pointer bg-card"
            >
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="p-2">
            <DropdownMenuItem onClick={() => onEdit(bookmark)} className="cursor-pointer">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-200 cursor-pointer"
              onClick={() => onDelete(bookmark._id)}
            >
              <Trash className="mr-2 h-4 w-4 text-red-600 cursor-pointer" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="space-y-2">
        {bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {bookmark.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {bookmark.notes && (
          <p className="text-sm text-muted-foreground">
            {bookmark.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BookmarkCard;