import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import HomePageSearchBar from "../components/Searchbar/homepageSearchBar";
import AddBookmarkForm from "../components/Bookmarks/AddBookmarkForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Grid,
  List,
  CirclePlus
} from "lucide-react";
import ResourceCard from "@/components/common/ResourceCard";
import { usePersistentState } from "@/hooks/usePersistentState";
interface Bookmark {
  _id: string;
  title: string;
  url: string;
  tags: string[];
  notes?: string;
  isFocus?: boolean;
  createdAt?: string;
}

type ViewMode = "grid" | "list";

const Home = () => {
  const storedToken =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [token] = useState<string | null>(storedToken);

  const [profile, setProfile] = useState<{
    username: string;
    email: string;
  } | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editBookmark, setEditBookmark] = useState<Bookmark | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = usePersistentState<ViewMode>(
    "home-viewMode",
    "grid",
  );

  /* -------------------- Fetch Profile -------------------- */
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [token]);

  /* -------------------- Fetch Bookmarks -------------------- */
  const fetchBookmarks = () => {
    if (!token) return;
    fetch("http://localhost:5000/api/bookmarks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: Bookmark[]) => setBookmarks(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchBookmarks();
  }, [token]);

  /* -------------------- Tags & Filtered Bookmarks -------------------- */
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    bookmarks.forEach((b) => b.tags.forEach((tag) => tagsSet.add(tag)));
    return Array.from(tagsSet);
  }, [bookmarks]);

  const filteredBookmarks = useMemo(() => {
    let result = bookmarks;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q)) ||
          (b.notes && b.notes.toLowerCase().includes(q)),
      );
    }

    if (filterTag) {
      result = result.filter((b) => b.tags.includes(filterTag));
    }

    return result;
  }, [bookmarks, searchQuery, filterTag]);

  /* -------------------- CRUD Handlers -------------------- */
  const handleBookmarkAdded = (bookmark: Bookmark) => {
    setBookmarks((prev) => [bookmark, ...prev]);
    setShowForm(false);
  };

  const handleBookmarkUpdated = (bookmark: Bookmark) => {
    setBookmarks((prev) =>
      prev.map((b) => (b._id === bookmark._id ? bookmark : b)),
    );
    setEditBookmark(null);
    setShowForm(false);
  };

  const handleEditClick = (bookmark: Bookmark) => {
    setEditBookmark(bookmark);
    setShowForm(true);
  };

  const handleDeleteClick = async (id: string) => {
    if (!token) return;
    if (!window.confirm("Delete this bookmark?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookmarks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setBookmarks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /* -------------------- Helper: Favicon -------------------- */
  const getFavicon = (url: string) => {
    try {
      const hostname = new URL(url.startsWith("http") ? url : `https://${url}`)
        .hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
    } catch {
      return "/favicon.ico";
    }
  };

  return (
    <main className="p-7 min-h-screen bg-background text-foreground transition-colors duration-300">

      {/* Search / Filter / View Toggle */}
      <div className="flex items-center justify-center mb-6 gap-4 flex-wrap">
        <HomePageSearchBar
          placeholder="Search bookmarks or tags..."
          onSearch={setSearchQuery}
          className="max-w-md w-full p-2"
        />

        {allTags.length > 0 && (
          <Select
            value={filterTag ?? "all"}
            onValueChange={(value) =>
              setFilterTag(value === "all" ? null : value)
            }
          >
            <SelectTrigger id="tag-filter" className="w-45 bg-card" aria-label="Filter bookmarks by tag">
              <SelectValue placeholder="All tags" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem  value="all">All tags</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
          >
            <Grid className="w-5 h-5 mr-1" /> Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
          >
            <List className="w-5 h-5 mr-1" /> List
          </Button>
        </div>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <AddBookmarkForm
          onAdded={handleBookmarkAdded}
          onUpdated={handleBookmarkUpdated}
          onCancel={() => {
            setShowForm(false);
            setEditBookmark(null);
          }}
          bookmarkToEdit={editBookmark}
        />
      )}

      <div className="flex justify-center mb-6">
        <Button
          onClick={() => {
            setShowForm(true);
            setEditBookmark(null);
          }}
        >
          {" "}
          <CirclePlus aria-hidden="true" className="w-5 h-5 mr-1" />
          {showForm ? "Close Form" : "Add New Bookmark"}
        </Button>
      </div>

      {/* Bookmark Cards */}
      {filteredBookmarks.length === 0 ? (
        <p className="text-center text-muted-foreground mt-6">
          No results found.
        </p>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {filteredBookmarks.map((b) => (
            <ResourceCard
                key={b._id}
                bookmark={b}
                getFavicon={getFavicon}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
