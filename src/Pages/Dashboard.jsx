/*
File: src/pages/Dashboard.jsx
This file composes the components above. Keep this as your page entry.
*/
import React, { useState, useMemo } from "react";
import NavbarDashboard from "../components/NavbarDashboard.jsx";
import Sidebar from "../components/Sidebar.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import NewProjectModal from "../modals/NewProjectModal.jsx";
import ProjectDetailsModal from "../modals/ProjectDetailedModal.jsx";
import EditProjectModal from "../modals/EditProjectModal.jsx";
import AddProjectCard from "../components/AddProjectCard.jsx";
import { useProjects } from "../hooks/useProjects.jsx";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate?.() ?? (() => {});
  const { projects, addProject, updateProject } = useProjects();

  // ✅ State management
  const [hoveredId, setHoveredId] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);

  const [search, setSearch] = useState("");
    const [filters, setFiltersState] = useState({
    status: { Completed: false, Pending: false, "Under Development": false },
    createdFrom: "",
    createdTo: "",
    lastFrom: "",
    lastTo: "",
    });

  const [showNew, setShowNew] = useState(false);
  const [detailsId, setDetailsId] = useState(null);
  const [editId, setEditId] = useState(null);

  // ✅ Filters update logic
function setFilters(key, value) {
  if (key === "status") {
    setFiltersState((s) => ({
      ...s,
      status: { ...s.status, [value]: !s.status[value] },
    }));
    return;
  }
  setFiltersState((s) => ({ ...s, [key]: value }));
}

  const openDetails = (id) => setDetailsId(id);
  const openEdit = (id) => setEditId(id);
  const handleCreate = (p) => {
    addProject(p);
    setShowNew(false);
  };
  const handleSaveEdit = (id, patch) => {
    updateProject(id, patch);
    setEditId(null);
  };

  // ✅ Filtering logic
const filtered = useMemo(() => {
  return projects.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
      return false;

    const anyChecked = Object.values(filters.status).some(Boolean);
    if (anyChecked && !filters.status[p.status]) return false;

    if (filters.createdFrom && new Date(p.createdAt) < new Date(filters.createdFrom))
      return false;
    if (filters.createdTo && new Date(p.createdAt) > new Date(filters.createdTo))
      return false;
    if (filters.lastFrom && new Date(p.lastCommit) < new Date(filters.lastFrom))
      return false;
    if (filters.lastTo && new Date(p.lastCommit) > new Date(filters.lastTo))
      return false;

    return true;
  });
}, [projects, search, filters]);

  return (
    <div className="min-h-screen text-gray-100 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-x-hidden">
      <NavbarDashboard search={search} setSearch={setSearch} username="Kesava" />

      {/* Main Layout */}
      <main className="flex pt-[4.5rem] px-6 sm:px-10 gap-6 transition-all duration-500 ease-in-out">
        {/* Sidebar */}
        <Sidebar
          isOpen={isFiltersOpen}
          toggle={() => setIsFiltersOpen((v) => !v)}
          filters={filters}
          setFilters={setFilters}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Projects Section */}
        <section className="flex-1 p-6 overflow-hidden">
          {viewMode === "grid" ? (
            // 🧱 Grid View
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-500 ease-in-out"
              style={{ transformOrigin: "center" }}
            >
              <AddProjectCard onAdd={handleCreate} />
              {filtered.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onOpen={openDetails}
                  onEdit={openEdit}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                />
              ))}
            </div>
          ) : (
            // 📄 List View (Hover to reveal description)
            <div className="bg-white/5 rounded-xl border border-white/10 backdrop-blur-md overflow-hidden shadow-lg transition-all duration-500 ease-in-out">
            <table className="w-full text-sm text-gray-200 border-collapse">
                <thead className="bg-white/10">
                <tr>
                    <th className="text-left py-3 px-4">Project</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Last Commit Date</th>
                    <th className="text-left py-3 px-4">Commit ID</th>
                    <th className="text-left py-3 px-4">Action</th>
                </tr>
                </thead>

                <tbody>
                {/* Add New Project Row */}
                <tr className="border-t border-white/10">
                    <td colSpan="5" className="p-4">
                    <AddProjectCard onAdd={handleCreate} />
                    </td>
                </tr>

                {/* Actual Projects */}
                {filtered.map((p) => (
                    <React.Fragment key={p.id}>
                    {/* Main row */}
                    <tr
                        onMouseEnter={() => setHoveredId(p.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`border-t border-white/10 transition-all duration-300 ${
                        hoveredId === p.id ? "bg-white/5 shadow-lg" : "hover:bg-white/10"
                        }`}
                        style={{
                        boxShadow:
                            hoveredId === p.id
                            ? p.status === "Completed"
                                ? "0 0 15px rgba(34,197,94,0.3)"
                                : p.status === "Pending"
                                ? "0 0 15px rgba(234,179,8,0.3)"
                                : "0 0 15px rgba(37,99,235,0.3)"
                            : "none",
                        }}
                    >
                        <td className="py-3 px-4 font-medium text-gray-100">
                        {p.name}
                        </td>
                        <td className="py-3 px-4">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            p.status === "Completed"
                                ? "bg-green-600/30 text-green-300"
                                : p.status === "Pending"
                                ? "bg-yellow-600/30 text-yellow-300"
                                : "bg-blue-600/30 text-blue-300"
                            }`}
                        >
                            {p.status}
                        </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{p.lastCommit || "N/A"}</td>
                        <td className="py-3 px-4 text-gray-400 font-mono text-xs">
                        {p.commitId || "—"}
                        </td>
                        <td className="py-3 px-4 text-right">
                        <button
                            onClick={() => openEdit(p.id)}
                            className="px-3 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs shadow transition-all"
                        >
                            Edit
                        </button>
                        </td>
                    </tr>

                    {/* Expanding Description Row */}
                    <tr
                        className={`transition-all duration-500 ease-in-out ${
                        hoveredId === p.id ? "max-h-40" : "max-h-0"
                        }`}
                    >
                        <td colSpan="5" className="p-0">
                        <div
                            className={`overflow-hidden transition-all duration-500 ${
                            hoveredId === p.id
                                ? "opacity-100 max-h-40 py-4 px-8"
                                : "opacity-0 max-h-0 px-8"
                            }`}
                        >
                            <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-gray-300 text-sm shadow-inner">
                            <p className="font-semibold text-indigo-400 mb-2">
                                Description:
                            </p>
                            <p>{p.description || "No description provided for this project."}</p>

                            <div className="mt-3 text-xs text-gray-400">
                                <p>Created: {p.createdAt || "N/A"}</p>
                                <p>Last Commit: {p.lastCommit || "N/A"}</p>
                                <p>Commit ID: {p.commitId || "—"}</p>
                            </div>
                            </div>
                        </div>
                        </td>
                    </tr>
                    </React.Fragment>
                ))}
                </tbody>
            </table>
            </div>

          )}
        </section>
      </main>
    </div>
  );
}
