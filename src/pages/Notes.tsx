import { useState, useEffect } from "react";
import HeroSection from "@/components/LandingPage/sections/HeroSection";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface Note {
  _id: string;
  title: string;
  content: string;
  bookmark?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

type ViewMode = "grid" | "list";

const Notes = () => {
  const { token: authToken } = useAuth();
  const token = authToken || localStorage.getItem("token");

  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Fetch all notes
  const fetchNotes = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/notes/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: Note[] = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [token]);

  // Save or update a note
  const handleSaveNote = async () => {
    if (!title.trim() || !content.trim()) return alert("Please fill in all fields");
    if (!token) return alert("You must be logged in");

    try {
      if (editingNote) {
        const res = await fetch(`http://localhost:5000/api/notes/${editingNote._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ title, content }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update note");

        setNotes(notes.map((n) => (n._id === editingNote._id ? data : n)));
      } else {
        const res = await fetch("http://localhost:5000/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ title, content }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to add note");

        setNotes([data, ...notes]);
      }

      setTitle("");
      setContent("");
      setEditingNote(null);
      setShowForm(false);
    } catch (err) {
      console.error("Note error:", err);
      alert("Failed to save note.");
    }
  };

  const handleEditNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDeleteNote = async (id: string) => {
    if (!window.confirm("Delete this note?")) return;
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete note");

      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete note.");
    }
  };

  return (
    <div className="min-h-screen p-7">
      <HeroSection
        title="My Notes"
        subtitle="Keep track of your notes for bookmarks"
        buttonText="View Insights"
        buttonLink="/insights"
        gradientFrom="from-orange-900"
        gradientTo="to-orange-400"
        textColor="text-white"
        buttonBg="bg-white"
        buttonTextColor="text-orange-500"
      />

      {/* Add/Edit & View Toggle Buttons */}
      <section className="text-center py-6 flex justify-center gap-4 flex-wrap">
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => {
            setTitle("");
            setContent("");
            setEditingNote(null);
            setShowForm(true);
          }}
        >
          {editingNote ? "Edit Note" : "Add New Note"}
        </Button>

        <Button variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}>
          Grid
        </Button>
        <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
          List
        </Button>
      </section>

      {/* Notes Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveNote();
            }}
            className="bg-card p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
          >
            <h3 className="text-xl font-semibold">{editingNote ? "Edit Note" : "Add Note"}</h3>

            <input
              type="text"
              placeholder="Note Title"
              className="w-full border border-border rounded px-2 py-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              className="w-full border border-border rounded px-2 py-1 h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingNote(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">{editingNote ? "Update" : "Create"}</Button>
            </div>
          </form>
        </div>
      )}

      {/* Notes List/Grid */}
      <section className="mt-6">
        {loading ? (
          <p className="text-center">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes yet.</p>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Card key={note._id} className="p-4 rounded-xl shadow-md border border-border">
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button size="sm" onClick={() => handleEditNote(note)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteNote(note._id)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {notes.map((note) => (
              <div
                key={note._id}
                className="flex justify-between items-start p-3 border border-border rounded-lg shadow-sm bg-card"
              >
                <div>
                  <h4 className="font-semibold">{note.title}</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={() => handleEditNote(note)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteNote(note._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Notes;
