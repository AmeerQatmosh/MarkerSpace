import React from "react";

interface AddItemFormProps {
  title: string;
  inputLabel?: string;
  input: string;
  setInput: (val: string) => void;
  date?: string;
  setDate?: (val: string) => void;
  time?: string;
  setTime?: (val: string) => void;
  description?: string;
  setDescription?: (val: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({
  title,
  inputLabel = "Title",
  input,
  setInput,
  date,
  setDate,
  time,
  setTime,
  description,
  setDescription,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">{title}</h3>

        {/* Title */}
        <input
          type="text"
          placeholder={inputLabel}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 mb-3 border rounded"
        />

        {/* Date (conditionally visible) */}
        {typeof setDate === "function" ? (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded"
          />
        ) : (
          <div className="mb-3" /> // keeps spacing
        )}

        {/* Time (conditionally visible) */}
        {typeof setTime === "function" ? (
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded"
          />
        ) : (
          <div className="mb-3" />
        )}

        {/* Description (conditionally visible) */}
        {typeof setDescription === "function" ? (
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 mb-3 border rounded"
          />
        ) : (
          <div className="mb-3" />
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={onCancel}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
          >
            {title.includes("Edit") ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;
