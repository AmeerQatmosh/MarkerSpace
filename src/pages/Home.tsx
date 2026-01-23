import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HomePageSearchBar from "../components/Searchbar/homepageSearchBar";
import AddBookmarkForm from "../components/Bookmarks/AddBookmarkForm";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Grid, List, MoreVertical, Pencil, Trash, CirclePlus } from "lucide-react";
import ResourceCard from "@/components/common/ResourceCard";
import ResourceCardActions from "@/components/common/ResourceCardActions";
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

  const [profile, setProfile] = useState<{ username: string; email: string } | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editBookmark, setEditBookmark] = useState<Bookmark | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

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
          (b.notes && b.notes.toLowerCase().includes(q))
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
      prev.map((b) => (b._id === bookmark._id ? bookmark : b))
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
      const res = await fetch(
        `http://localhost:5000/api/bookmarks/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to delete");
      setBookmarks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /* -------------------- Helper: Favicon -------------------- */
  const getFavicon = (url: string) => {
    try {
      const hostname = new URL(
        url.startsWith("http") ? url : `https://${url}`
      ).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
    } catch {
      return "/favicon.ico";
    }
  };

  return (
    <div className="p-7 min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Welcome */}
      {profile && (
        <div className="text-center mt-10 mb-6">
          <h3>
            Welcome{" "}
            <strong className="text-primary">
              {profile.username || profile.email}
            </strong>
            , manage your bookmarks!
          </h3>
        </div>
      )}

      {/* Search / Filter / View Toggle */}
      <div className="flex justify-center mb-6 gap-4 flex-wrap">
        <HomePageSearchBar
          placeholder="Search bookmarks or tags..."
          onSearch={setSearchQuery}
          className="max-w-md w-full h-11 bg-card border border-border rounded-xl shadow-md p-2"
        />

        {allTags.length > 0 && (
          <select
            className="border border-border rounded-lg px-3 py-2 bg-card"
            value={filterTag || ""}
            onChange={(e) => setFilterTag(e.target.value || null)}
          >
            <option value="">All tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        )}

        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-5 h-5 mr-1" /> Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
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
        > <CirclePlus className="w-5 h-5 mr-1" />
          {showForm ? "Close Form" : "Add New Bookmark"}
        </Button>
      </div>

      {/* Bookmark Cards */}
      {filteredBookmarks.length === 0 ? (
        <p className="text-center text-muted-foreground mt-6">
          No results found.
        </p>
      ) : (
        // <div
        //   className={
        //     viewMode === "grid"
        //       ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        //       : "flex flex-col gap-4"
        //   }
        // >
        //   {filteredBookmarks.map((b) => (
        //     <Card
        //       key={b._id}
        //       className={`p-4 rounded-xl shadow-md border border-border bg-card ${
        //         b.isFocus ? "border-yellow-400" : ""
        //       }`}
        //     >
        //       <CardHeader className="flex flex-row items-start justify-between gap-2">
        //         <div className="flex items-center gap-2">
        //           <img
        //             src={getFavicon(b.url)}
        //             alt="favicon"
        //             className="w-6 h-6"
        //           />
        //           <CardTitle className="text-lg font-semibold">
        //             <a
        //               href={
        //                 b.url.startsWith("http")
        //                   ? b.url
        //                   : `https://${b.url}`
        //               }
        //               target="_blank"
        //               rel="noopener noreferrer"
        //               className="hover:underline text-primary"
        //             >
        //               {b.title}
        //             </a>
        //           </CardTitle>
        //         </div>

        //         <DropdownMenu>
        //           <DropdownMenuTrigger asChild>
        //             <Button size="icon" variant="outline">
        //               <MoreVertical className="w-4 h-4" />
        //             </Button>
        //           </DropdownMenuTrigger>

        //           <DropdownMenuContent align="end">
        //             <DropdownMenuItem onClick={() => handleEditClick(b)}>
        //               <Pencil className="mr-2 h-4 w-4" />
        //               Edit
        //             </DropdownMenuItem>
        //             <DropdownMenuItem
        //               className="text-red-600 focus:text-red-600 focus:bg-red-200"
        //               onClick={() => handleDeleteClick(b._id)}
        //             >
        //               <Trash className="mr-2 h-4 w-4 text-red-600" />
        //               Delete
        //             </DropdownMenuItem>
        //           </DropdownMenuContent>
        //         </DropdownMenu>
        //       </CardHeader>

        //       <CardContent className="space-y-2">
        //         {b.tags.length > 0 && (
        //           <div className="flex flex-wrap gap-2">
        //             {b.tags.map((tag) => (
        //               <span
        //                 key={tag}
        //                 className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs"
        //               >
        //                 {tag}
        //               </span>
        //             ))}
        //           </div>
        //         )}
        //         {b.notes && (
        //           <p className="text-sm text-muted-foreground">{b.notes}</p>
        //         )}
        //       </CardContent>
        //     </Card>
        //   ))}
        // </div>

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
      title={b.title}
      href={b.url.startsWith("http") ? b.url : `https://${b.url}`}
      icon={<img src={getFavicon(b.url)} alt="favicon" className="w-5 h-5" />}
      highlighted={b.isFocus}
      actions={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditClick(b)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-200"
              onClick={() => handleDeleteClick(b._id)}
            >
              <Trash className="mr-2 h-4 w-4 text-red-600" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    >
      {b.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {b.tags.map((tag) => (
            <span key={tag} className="bg-muted px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}
      {b.notes && <p className="text-sm text-muted-foreground">{b.notes}</p>}
    </ResourceCard>
  ))}
</div>

      )}
    </div>
  );
};

export default Home;
