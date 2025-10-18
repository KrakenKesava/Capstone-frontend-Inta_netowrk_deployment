import React from "react";

export default function ProjectCard({
  project,
  onOpen,
  onEdit,
  hoveredId,
  setHoveredId,
}) {
  const statusColors = {
    Completed: "from-green-500/40 via-green-400/30 to-green-500/10 shadow-green-500/40",
    Pending: "from-yellow-500/40 via-yellow-400/30 to-yellow-500/10 shadow-yellow-400/40",
    "Under Development": "from-blue-500/40 via-blue-400/30 to-blue-500/10 shadow-blue-400/40",
  };

  const glow =
    statusColors[project.status] ||
    "from-gray-400/40 via-gray-300/30 to-gray-400/10 shadow-gray-400/40";

  const isHovered = hoveredId === project.id;

  return (
    <div
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => onOpen(project.id)}
      className={`relative cursor-pointer rounded-2xl p-6 bg-gradient-to-br ${glow} backdrop-blur-md border border-white/10 transition-all duration-500 transform
        ${
          isHovered
            ? "scale-110 z-20 shadow-[0_0_30px_var(--tw-shadow-color)]"
            : hoveredId
            ? "scale-90 opacity-70"
            : "scale-100 opacity-100"
        }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)", // smooth "spring" feel
      }}
    >
      {/* Gradient shine overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Project Info */}
      <h3 className="text-lg font-semibold text-gray-100 mb-1">{project.name}</h3>

      <div className="mb-2">
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
            project.status === "Completed"
              ? "bg-green-600/30 text-green-300"
              : project.status === "Pending"
              ? "bg-yellow-600/30 text-yellow-300"
              : "bg-blue-600/30 text-blue-300"
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-3">
        Last Commit: <span className="text-gray-300">{project.lastCommit}</span>
      </p>

      {/* Show description only when hovered */}
      <div
        className={`text-sm text-gray-300 transition-all duration-500 ${
          isHovered ? "opacity-100 max-h-32" : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        {project.description || "No description available."}
      </div>

      {/* Edit Button (always visible, simple) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (typeof onEdit === 'function') onEdit(project.id);
        }}
        className="absolute bottom-4 right-4 px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs transition-all duration-300 shadow-md"
      >
        Edit
      </button>
    </div>
  );
}
