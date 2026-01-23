import BookmarkItem from "./BookmarkItem";

interface BookmarkListProps {
  bookmarks: any[];
  onDelete?: (id: string) => void;
  onToggleFocus?: (id: string) => void;
  view?: "list" | "grid";
}

const BookmarkList = ({ bookmarks, onDelete, onToggleFocus, view = "grid" }: BookmarkListProps) => {
  if (!bookmarks || bookmarks.length === 0) return <p className="text-center mt-4">No bookmarks found.</p>;

  return (
    <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
      {bookmarks.map((b) => (
        <BookmarkItem key={b._id} bookmark={b} onDelete={onDelete!} onToggleFocus={onToggleFocus} />
      ))}
    </div>
  );
};

export default BookmarkList;
