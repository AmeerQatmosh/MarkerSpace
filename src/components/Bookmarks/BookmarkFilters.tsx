import { useState } from "react";

interface FiltersProps {
  tags: string[];
  collections: any[];
  onFilter: (filters: { tag?: string; collection?: string; focus?: boolean }) => void;
}

const BookmarkFilters = ({ tags, collections, onFilter }: FiltersProps) => {
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [focusOnly, setFocusOnly] = useState(false);

  const handleApply = () => {
    onFilter({ tag: selectedTag || undefined, collection: selectedCollection || undefined, focus: focusOnly });
  };

  return (
    <div className="flex flex-wrap gap-2 items-center mb-4">
      <select value={selectedTag} onChange={e => setSelectedTag(e.target.value)} className="p-2 rounded border">
        <option value="">All Tags</option>
        {tags.map((t, i) => <option key={i} value={t}>{t}</option>)}
      </select>

      <select value={selectedCollection} onChange={e => setSelectedCollection(e.target.value)} className="p-2 rounded border">
        <option value="">All Collections</option>
        {collections.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>

      <label className="flex items-center gap-1">
        <input type="checkbox" checked={focusOnly} onChange={() => setFocusOnly(!focusOnly)} />
        Focus only
      </label>

      <button onClick={handleApply} className="bg-blue-500 text-white px-4 py-2 rounded">Apply</button>
    </div>
  );
};

export default BookmarkFilters;
