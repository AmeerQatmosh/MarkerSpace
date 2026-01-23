import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import HomePageSearchBar from "@/components/Searchbar/homepageSearchBar";
import AddBookmarkForm from "../components/Bookmarks/AddBookmarkForm";
import { Grid, List, Settings, CirclePlus } from "lucide-react";

import ResourceCard from "@/components/common/ResourceCard";
import ResourceCardActions from "@/components/common/ResourceCardActions";
interface Bookmark {
  _id: string;
  title: string;
  url: string;
  tags: string[];
  notes?: string;
  isFocus?: boolean;
  collectionId?: string;
}

interface Collection {
  _id: string;
  name: string;
  description?: string;
}

type ViewMode = "grid" | "list";

const Collections = () => {
  const navigate = useNavigate();
  const params = useParams<{ collectionName?: string }>();
  const storedToken =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  const [token] = useState<string | null>(storedToken);

  const [collections, setCollections] = useState<Collection[]>([]);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const [showBookmarkForm, setShowBookmarkForm] = useState(false);
  const [editBookmark, setEditBookmark] = useState<Bookmark | null>(null);

  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  const [searchQuery, setSearchQuery] = useState(""); // bookmarks search
  const [collectionSearchQuery, setCollectionSearchQuery] = useState(""); // collections search
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [showGearMenu, setShowGearMenu] = useState(false);

  /* -------------------- Fetch collections -------------------- */
  const fetchCollections = async () => {
    if (!token) return;
    const res = await fetch("http://localhost:5000/api/collections", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data: Collection[] = await res.json();
    setCollections(data);
  };

  const fetchBookmarks = async (collectionId: string) => {
    if (!token) return;
    const res = await fetch("http://localhost:5000/api/bookmarks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data: Bookmark[] = await res.json();
    const filtered = data.filter((b) => b.collectionId === collectionId);
    setBookmarks(filtered);
    setFilteredBookmarks(filtered);
  };

  useEffect(() => {
    fetchCollections();
  }, [token]);

  useEffect(() => {
    if (!params.collectionName) {
      setCollection(null);
      setBookmarks([]);
      setFilteredBookmarks([]);
      return;
    }

    const col = collections.find((c) => c.name === params.collectionName);
    if (col) {
      setCollection(col);
      fetchBookmarks(col._id);
    }
  }, [params.collectionName, collections]);

  /* -------------------- Bookmark Search -------------------- */
  useEffect(() => {
    if (!searchQuery) {
      setFilteredBookmarks(bookmarks);
      return;
    }
    setFilteredBookmarks(
      bookmarks.filter(
        (b) =>
          b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    );
  }, [searchQuery, bookmarks]);

  /* -------------------- Collections Search -------------------- */
  const filteredCollections = collectionSearchQuery
    ? collections.filter((c) =>
        c.name.toLowerCase().includes(collectionSearchQuery.toLowerCase())
      )
    : collections;

  /* -------------------- CRUD handlers -------------------- */
  const handleBookmarkAdded = (bookmark: Bookmark) => {
    setBookmarks((prev) => [bookmark, ...prev]);
    setFilteredBookmarks((prev) => [bookmark, ...prev]);
    setShowBookmarkForm(false);
  };

  const handleBookmarkUpdated = (bookmark: Bookmark) => {
    setBookmarks((prev) =>
      prev.map((b) => (b._id === bookmark._id ? bookmark : b))
    );
    setFilteredBookmarks((prev) =>
      prev.map((b) => (b._id === bookmark._id ? bookmark : b))
    );
    setEditBookmark(null);
    setShowBookmarkForm(false);
  };

  const handleEditClick = (bookmark: Bookmark) => {
    setEditBookmark(bookmark);
    setShowBookmarkForm(true);
  };

  const handleDeleteBookmark = async (id: string) => {
    if (!token || !window.confirm("Delete this bookmark?")) return;
    const res = await fetch(`http://localhost:5000/api/bookmarks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setBookmarks((prev) => prev.filter((b) => b._id !== id));
      setFilteredBookmarks((prev) => prev.filter((b) => b._id !== id));
    }
  };

  const handleDeleteCollection = async () => {
    if (!collection || !token) return;
    const name = prompt(
      `Type the name of the collection (${collection.name}) to confirm deletion:`
    );
    if (name !== collection.name) return;

    await fetch(`http://localhost:5000/api/collections/${collection._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate("/collections");
    fetchCollections();
  };

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
    <div className="min-h-screen p-7 bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        {collection && (
          <Button variant="outline" onClick={() => navigate("/collections")}>
            &larr; Back
          </Button>
        )}

        <h2 className="text-2xl font-bold">
          {collection ? collection.name : "Collections"}
        </h2>

        <div className="flex items-center gap-2 flex-wrap">
          {!collection && (
            <>
              <HomePageSearchBar
                placeholder="Search collections..."
                live
                onSearch={(q) => setCollectionSearchQuery(q)}
                className="max-w-md h-11 bg-card border border-border rounded-xl shadow-md p-2"
              />
              <Button onClick={() => setShowCollectionForm(true)}>
                <CirclePlus className="w-5 h-5 mr-1" /> New Collection
              </Button>
            </>
          )}

          {collection && (
            <>
              <HomePageSearchBar
                placeholder="Search bookmarks..."
                live
                onSearch={(q) => setSearchQuery(q)}
                className="max-w-md h-11 bg-card border border-border rounded-xl shadow-md p-2"
              />
              <Button onClick={() => setShowBookmarkForm(true)}>
                <CirclePlus className="w-5 h-5 mr-1" /> Add Bookmard
              </Button>

              <div className="relative">
                <Button
                  onClick={() => setShowGearMenu((v) => !v)}
                  className="p-2"
                >
                  <Settings />
                </Button>

                {showGearMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-card border border-border shadow-lg rounded-lg flex flex-col z-50">
                    <button
                      className="px-4 py-2 hover:bg-muted text-left"
                      onClick={() => {
                        setCollectionName(collection.name);
                        setShowCollectionForm(true);
                        setShowGearMenu(false);
                      }}
                    >
                      Edit Collection
                    </button>
                    <button
                      className="px-4 py-2 hover:bg-muted text-left text-destructive "
                      onClick={handleDeleteCollection}
                    >
                      Delete Collection
                    </button>
                  </div>
                )}
              </div>
            </>
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
      </div>

      {/* Collections */}
      {!collection && (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        >
          {filteredCollections.map((c) => (
            <Card
              key={c._id}
              className={`p-5 rounded-xl shadow-md border border-border cursor-pointer hover:shadow-lg transition ${
                viewMode === "list" ? "flex items-center" : ""
              }`}
              onClick={() => navigate(`/collections/${c.name}`)}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {c.name}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}

          {filteredCollections.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No collections found.
            </p>
          )}
        </div>
      )}

      {/* Bookmarks */}
      {collection && (
        <div className="mt-6">
          {filteredBookmarks.length === 0 && (
            <p className="text-gray-500 text-center mb-4">
              No bookmarks found.
            </p>
          )}

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredBookmarks.map((b) => (
              <Card
                key={b._id}
                className="p-4 rounded-xl shadow-md border border-border"
              >
                <CardHeader className="flex items-center gap-2">
                  <img
                    src={getFavicon(b.url)}
                    alt="favicon"
                    className="w-6 h-6"
                  />
                  <CardTitle>
                    <a
                      href={
                        b.url.startsWith("http")
                          ? b.url
                          : `https://${b.url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-primary"
                    >
                      {b.title}
                    </a>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {b.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {b.tags.map((t) => (
                        <span
                          key={t}
                          className="bg-muted px-2 py-1 rounded text-xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {b.notes && (
                    <p className="text-sm text-muted-foreground">
                      {b.notes}
                    </p>
                  )}

                  <div className="flex justify-end gap-2 mt-2">
                    <Button size="sm" onClick={() => handleEditClick(b)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteBookmark(b._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Bookmark Form */}
      {showBookmarkForm && (
        <AddBookmarkForm
          onAdded={handleBookmarkAdded}
          onUpdated={handleBookmarkUpdated}
          onCancel={() => {
            setShowBookmarkForm(false);
            setEditBookmark(null);
          }}
          bookmarkToEdit={editBookmark}
          defaultCollection={collection?._id || null}
        />
      )}

      {/* Collection Form */}
      {showCollectionForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!collectionName.trim()) return;

              if (collection) {
                await fetch(
                  `http://localhost:5000/api/collections/${collection._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name: collectionName }),
                  }
                );
              } else {
                await fetch("http://localhost:5000/api/collections", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({ name: collectionName }),
                });
              }

              setCollectionName("");
              setShowCollectionForm(false);
              fetchCollections();
            }}
            className="bg-card p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4"
          >
            <h3 className="text-xl font-semibold">
              {collection ? "Edit Collection" : "New Collection"}
            </h3>

            <input
              type="text"
              placeholder="Collection name"
              className="border border-border rounded px-2 py-1 w-full"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              required
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-3 py-1 border rounded"
                onClick={() => setShowCollectionForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-primary text-white rounded"
              >
                {collection ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Collections;

