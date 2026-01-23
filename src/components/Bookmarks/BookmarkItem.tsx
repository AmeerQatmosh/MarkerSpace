import { Button } from "../ui/button";

interface BookmarkItemProps {
  bookmark: any;
  onDelete: (id: string) => void;
  onToggleFocus?: (id: string) => void;
}

const BookmarkItem = ({ bookmark, onDelete, onToggleFocus }: BookmarkItemProps) => {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg mb-1">{bookmark.title}</h3>
        <a href={bookmark.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mb-2 block">
          {bookmark.link}
        </a>
        {bookmark.notes && <p className="text-gray-600 dark:text-gray-300 mb-2">{bookmark.notes}</p>}
        {bookmark.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {bookmark.tags.map((tag: string, i: number) => (
              <span key={i} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
        {bookmark.collection && <p className="text-sm italic">Collection: {bookmark.collection.name || bookmark.collection}</p>}
      </div>

      <div className="flex justify-between mt-3">
        {onToggleFocus && (
          <Button size="sm" onClick={() => onToggleFocus(bookmark._id)}>
            {bookmark.isFocus ? "Remove from Focus" : "Add to Focus"}
          </Button>
        )}
        <Button size="sm" variant="destructive" onClick={() => onDelete(bookmark._id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BookmarkItem;
