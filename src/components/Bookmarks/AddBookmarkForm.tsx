import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";

interface Collection {
  _id: string;
  name: string;
}

interface Bookmark {
  _id?: string;
  title: string;
  url: string;
  tags: string[];
  notes?: string;
  collectionId?: string | null;
  isFocus?: boolean;
}

interface AddBookmarkFormProps {
  onAdded: (bookmark: Bookmark) => void;
  onUpdated?: (bookmark: Bookmark) => void;
  onCancel: () => void;
  bookmarkToEdit?: Bookmark | null;
}

const AddBookmarkForm = ({ onAdded, onUpdated, onCancel, bookmarkToEdit }: AddBookmarkFormProps) => {
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [collection, setCollection] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);

  // Pre-fill fields when editing
  useEffect(() => {
    if (bookmarkToEdit) {
      setTitle(bookmarkToEdit.title || "");
      setUrl(bookmarkToEdit.url || "");
      setTags((bookmarkToEdit.tags || []).join(", "));
      setNotes(bookmarkToEdit.notes || "");
      setCollection(bookmarkToEdit.collectionId || null);
      setIsFocus(bookmarkToEdit.isFocus || false);
    } else {
      setTitle(""); setUrl(""); setTags(""); setNotes(""); setCollection(null); setIsFocus(false);
    }
  }, [bookmarkToEdit]);

  // Fetch user's collections
  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/collections", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setCollections)
      .catch(console.error);
  }, [token]);

  const handleSubmit = async () => {
    if (!title.trim() || !url.trim()) {
      alert("Title and URL are required");
      return;
    }

    const body = {
      title,
      url,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      notes,
      collectionId: collection,
      isFocus,
    };

    try {
      const res = await fetch(
        bookmarkToEdit ? `http://localhost:5000/api/bookmarks/${bookmarkToEdit._id}` : "http://localhost:5000/api/bookmarks",
        {
          method: bookmarkToEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save bookmark");

      if (bookmarkToEdit && onUpdated) onUpdated(data);
      else onAdded(data);

      // Reset form
      setTitle(""); setUrl(""); setTags(""); setNotes(""); setCollection(null); setIsFocus(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save bookmark");
    }
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-lg p-6 rounded-xl shadow-xl bg-card text-card-foreground border border-border">
        <CardHeader>
          <CardTitle className="text-2xl">{bookmarkToEdit ? "Edit Bookmark" : "Add New Bookmark"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Bookmark title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" value={tags} onChange={e => setTags(e.target.value)} placeholder="tag1, tag2" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full p-2 rounded border border-border bg-card text-card-foreground"
              rows={3}
              placeholder="Optional notes"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="collection">Collection</Label>
            <select
              id="collection"
              value={collection || ""}
              onChange={e => setCollection(e.target.value || null)}
              className="w-full p-2 rounded border border-border bg-card"
            >
              <option value="">No Collection</option>
              {collections.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>

          <label className="flex items-center space-x-2">
            <Checkbox checked={isFocus} onCheckedChange={(v) => setIsFocus(!!v)} />
            <span>Add to Focus</span>
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button onClick={handleSubmit}>{bookmarkToEdit ? "Update" : "Add"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBookmarkForm;
