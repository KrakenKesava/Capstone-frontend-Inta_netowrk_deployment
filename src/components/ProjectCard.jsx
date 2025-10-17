import React, { useState, useEffect } from "react";

export default function ProjectCard({ project, onOpen, onEdit, onSave, hoveredId, setHoveredId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", status: "Pending", lastCommit: "", description: "" });

  useEffect(() => {
    if (project) {
      setEditData({
        name: project.name || "",
        status: project.status || "Pending",
        lastCommit: project.lastCommit || "",
        description: project.description || "",
      });
    }
  }, [project]);

  const statusColors = {
    Completed: "from-green-500/40 via-green-400/30 to-green-500/10 shadow-green-500/40",
    Pending: "from-yellow-500/40 via-yellow-400/30 to-yellow-500/10 shadow-yellow-400/40",
    "Under Development": "from-blue-500/40 via-blue-400/30 to-blue-500/10 shadow-blue-400/40",
  };

  const glow = statusColors[project?.status] || "from-gray-400/40 via-gray-300/30 to-gray-400/10 shadow-gray-400/40";
  const isHovered = hoveredId === project?.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((s) => ({ ...s, [name]: value }));
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (typeof onSave === "function") onSave(project.id, editData);
    else if (typeof onEdit === "function") onEdit(project.id);
    setIsEditing(false);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setEditData({ name: project.name || "", status: project.status || "Pending", lastCommit: project.lastCommit || "", description: project.description || "" });
    setIsEditing(false);
  };

  return (
    <div
      onMouseEnter={() => setHoveredId && setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId && setHoveredId(null)}
      onClick={() => !isEditing && onOpen && onOpen(project.id)}
      className={`group relative cursor-pointer rounded-2xl p-6 bg-gradient-to-br ${glow} backdrop-blur-md border border-white/10 transition-all duration-500 transform ${isHovered ? "scale-105 z-20 shadow-2xl" : "scale-100"}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {isEditing ? (
        <div onClick={(e) => e.stopPropagation()} className="relative z-10">
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300">Title</label>
              <input name="name" value={editData.name} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-black/20 border border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-300">Status</label>
              <select name="status" value={editData.status} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-black/20 border border-white/10 text-white">
                <option>Pending</option>
                <option>Under Development</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-300">Date and Time</label>
              <input type="datetime-local" name="lastCommit" value={editData.lastCommit} onChange={handleChange} className="w-full mt-1 p-2 rounded bg-black/20 border border-white/10 text-white" />
            </div>
            <div>
              <label className="text-sm text-gray-300">Description</label>
              <textarea name="description" value={editData.description} onChange={handleChange} rows={3} className="w-full mt-1 p-2 rounded bg-black/20 border border-white/10 text-white" />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={handleCancel} className="px-3 py-1 rounded bg-gray-800 text-gray-300">Cancel</button>
              <button onClick={handleSave} className="px-3 py-1 rounded bg-indigo-600 text-white">Save</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-gray-100 mb-1">{project.name}</h3>
          <div className="mb-3">
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${project.status === "Completed" ? "bg-green-600/30 text-green-300" : project.status === "Pending" ? "bg-yellow-600/30 text-yellow-300" : "bg-blue-600/30 text-blue-300"}`}>{project.status}</span>
          </div>
          <p className="text-sm text-gray-300 mb-3">Last Commit: <span className="text-gray-200">{project.lastCommit}</span></p>
          <div className={`text-sm text-gray-300 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-90 max-h-20 overflow-hidden"}`}>
            <p className="leading-relaxed">{project.description}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm shadow">Edit</button>
          </div>
        </>
      )}
    </div>
  );
}