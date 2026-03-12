import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {
  Grid,
  List,
  MoreVertical,
  Pencil,
  Trash,
  CirclePlus,
} from "lucide-react";
import { usePersistentState } from "@/hooks/usePersistentState";
interface Bookmark {
  _id: string;
  title: string;
  url: string;
}

interface FocusItem {
  _id: string;
  bookmark: Bookmark;
  priority: "low" | "medium" | "high" | "urgent";
  frequency: "once" | "daily" | "weekly" | "custom";
  scheduledAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

type ViewMode = "grid" | "list";

const Focus = () => {
  const { token: authToken } = useAuth();
  const token = authToken || localStorage.getItem("token");

  const [focusList, setFocusList] = useState<FocusItem[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  // const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [viewMode, setViewMode] = usePersistentState<ViewMode>(
    "focus-viewMode",
    "grid",
  );

  const [selectedBookmark, setSelectedBookmark] = useState<string>("");
  const [priority, setPriority] = useState<FocusItem["priority"]>("medium");
  const [frequency, setFrequency] = useState<FocusItem["frequency"]>("once");
  const [scheduledAt, setScheduledAt] = useState<string>("");

  const [editingItem, setEditingItem] = useState<FocusItem | null>(null);

  // Fetch bookmarks
  const fetchBookmarks = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/api/bookmarks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: Bookmark[] = await res.json();
      setBookmarks(data);
    } catch (err) {
      console.error("Failed to fetch bookmarks", err);
    }
  };

  // Fetch focus items
  const fetchFocus = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/focus", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: FocusItem[] = await res.json();
      setFocusList(data);
    } catch (err) {
      console.error("Failed to fetch focus items", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
    fetchFocus();
  }, [token]);

  const handleSaveFocus = async () => {
    if (!selectedBookmark) return alert("Please select a bookmark");
    if (!token) return alert("You must be logged in");

    try {
      let res;
      if (editingItem) {
        // Update
        res = await fetch(
          `http://localhost:5000/api/focus/${editingItem._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ priority, frequency, scheduledAt }),
          },
        );
      } else {
        // Create
        res = await fetch("http://localhost:5000/api/focus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookmark: selectedBookmark,
            priority,
            frequency,
            scheduledAt,
          }),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        if ((data as any).code === 11000)
          alert("Focus already exists for this bookmark");
        else throw new Error(data.message || "Failed to save focus item");
        return;
      }

      // Refresh focus list
      fetchFocus();

      setSelectedBookmark("");
      setPriority("medium");
      setFrequency("once");
      setScheduledAt("");
      setEditingItem(null);
      setShowForm(false);
    } catch (err) {
      console.error("Focus save error:", err);
      alert("Failed to save focus item.");
    }
  };

  const handleEditFocus = (item: FocusItem) => {
    setEditingItem(item);
    setSelectedBookmark(item.bookmark._id);
    setPriority(item.priority);
    setFrequency(item.frequency);
    setScheduledAt(item.scheduledAt ? item.scheduledAt.slice(0, 16) : "");
    setShowForm(true);
  };

  const handleDeleteFocus = async (id: string) => {
    if (!window.confirm("Delete this focus item?")) return;
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/focus/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete focus item");

      setFocusList(focusList.filter((f) => f._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete focus item.");
    }
  };

  return (
    <div className="min-h-screen p-7">
      {/* Add/Edit Button & View Toggle */}
      <section className="text-center py-6 flex flex-col md:flex-row justify-center gap-4">
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => {
            setSelectedBookmark("");
            setPriority("medium");
            setFrequency("once");
            setScheduledAt("");
            setEditingItem(null);
            setShowForm(true);
          }}
        >
          {editingItem ? "Edit Focus" : "Add New Focus"}
        </Button>

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

        {/* <div className="flex gap-2">
          <Button
            size="sm"
            variant={viewMode === "card" ? "default" : "outline"}
            onClick={() => setViewMode("card")}
          >
            Card View
          </Button>
          <Button
            size="sm"
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
          >
            List View
          </Button>
        </div> */}
      </section>

      {/* Focus Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveFocus();
            }}
            className="bg-card p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
          >
            <h3 className="text-xl font-semibold">
              {editingItem ? "Edit Focus" : "Add Focus"}
            </h3>

            <select
              className="w-full border border-border rounded px-2 py-1"
              value={selectedBookmark}
              onChange={(e) => setSelectedBookmark(e.target.value)}
              required
              disabled={!!editingItem}
            >
              <option value="">Select bookmark</option>
              {bookmarks.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.title}
                </option>
              ))}
            </select>

            <select
              className="w-full border border-border rounded px-2 py-1"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as FocusItem["priority"])
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>

            <select
              className="w-full border border-border rounded px-2 py-1"
              value={frequency}
              onChange={(e) =>
                setFrequency(e.target.value as FocusItem["frequency"])
              }
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="custom">Custom</option>
            </select>

            <input
              type="datetime-local"
              className="w-full border border-border rounded px-2 py-1"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">{editingItem ? "Update" : "Create"}</Button>
            </div>
          </form>
        </div>
      )}

      {/* Focus List */}
      <section className="mt-6">
        {loading ? (
          <p className="text-center">Loading focus items...</p>
        ) : focusList.length === 0 ? (
          <p className="text-center text-gray-500">No focus items yet.</p>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusList.map((item) => (
              <Card
                key={item._id}
                className="p-4 rounded-xl shadow-md border border-border"
              >
                <CardHeader>
                  <CardTitle>{item.bookmark?.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Priority: {item.priority} | Frequency: {item.frequency}
                  </p>
                  {item.scheduledAt && (
                    <p className="text-sm text-muted-foreground">
                      Scheduled: {new Date(item.scheduledAt).toLocaleString()}
                    </p>
                  )}
                  <div className="flex justify-end gap-2 mt-2">
                    <Button size="sm" onClick={() => handleEditFocus(item)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteFocus(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {focusList.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center border border-border rounded p-3 bg-card"
              >
                <div>
                  <p className="font-semibold">{item.bookmark?.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Priority: {item.priority} | Frequency: {item.frequency}
                  </p>
                  {item.scheduledAt && (
                    <p className="text-sm text-muted-foreground">
                      Scheduled: {new Date(item.scheduledAt).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEditFocus(item)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteFocus(item._id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Focus;
