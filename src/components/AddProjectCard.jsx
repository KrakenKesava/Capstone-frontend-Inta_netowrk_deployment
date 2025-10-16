import React, { useState } from "react";

export default function AddProjectCard({ onAdd }) {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    status: "Pending",
    lastCommit: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return;
    onAdd({
      id: Date.now().toString(),
      name: form.name,
      status: form.status,
      lastCommit: form.lastCommit || new Date().toISOString().split("T")[0],
      description: form.description,
      createdAt: new Date().toISOString(),
    });
    setForm({ name: "", status: "Pending", lastCommit: "", description: "" });
    setFormOpen(false);
  };

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 backdrop-blur-md shadow-lg p-6 flex flex-col justify-center items-center text-gray-300 hover:bg-white/10 transition-all">
      {!formOpen ? (
        <button
          onClick={() => setFormOpen(true)}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-600 text-white text-3xl mb-2">
            +
          </div>
          <p className="text-sm font-medium">Add New Project</p>
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full space-y-3 text-sm"
        >
          <input
            type="text"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="p-2 rounded-md bg-white/10 border border-white/20"
          >
            <option>Pending</option>
            <option>Under Development</option>
            <option>Completed</option>
          </select>
          <input
            type="date"
            value={form.lastCommit}
            onChange={(e) => setForm({ ...form, lastCommit: e.target.value })}
            className="p-2 rounded-md bg-white/10 border border-white/20"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-2 rounded-md bg-white/10 border border-white/20 resize-none h-20"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500"
            >
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
