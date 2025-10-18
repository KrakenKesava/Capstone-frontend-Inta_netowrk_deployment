// File: src/modals/EditProjectModal.jsx
import React, { useState, useEffect } from "react";

export default function EditProjectModal({ project, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    status: "",
    description: "",
    lastCommit: "",
  });

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name || "",
        status: project.status || "Pending",
        description: project.description || "",
        lastCommit: project.lastCommit || "",
      });
    }
  }, [project]);

  if (!project) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(project.id, form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
      <div className="bg-[#1e1b4b]/90 border border-white/10 rounded-2xl shadow-2xl p-6 w-full max-w-md text-gray-200 scale-100 animate-fadeIn">
        <h2 className="text-lg font-semibold mb-4 text-indigo-300">
          Edit Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="text-sm text-gray-300">Project Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 rounded-md bg-white/10 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter project name"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm text-gray-300">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full mt-1 rounded-md bg-white/10 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option>Pending</option>
              <option>Under Development</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Last Commit */}
          <div>
            <label className="text-sm text-gray-300">Last Commit Date</label>
            <input
              type="date"
              name="lastCommit"
              value={form.lastCommit}
              onChange={handleChange}
              className="w-full mt-1 rounded-md bg-white/10 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full mt-1 rounded-md bg-white/10 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder="Add description..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
