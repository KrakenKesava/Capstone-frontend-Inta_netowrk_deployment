import React from "react";
import { List, LayoutGrid } from "lucide-react"; // icons

export default function Sidebar({
  isOpen,
  toggle,
  filters,
  setFilters,
  viewMode,
  setViewMode,
}) {
  return (
    <aside
      className={`relative sticky top-[5.3rem] h-[calc(100vh-5.3rem)] transition-all duration-300 backdrop-blur-md bg-white/5 border-r border-white/10 overflow-hidden rounded-tr-2xl rounded-br-2xl shadow-lg ${
        isOpen ? "w-72" : "w-16"
      }`}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/50 via-[#2a1f6d]/40 to-transparent pointer-events-none" />

      {/* Sidebar content */}
      <div className="relative p-5 pt-9 z-10">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-5 text-gray-100 tracking-wide">
          Filter Options
        </h2>

       {/* Status Filters */}
        <div className="space-y-3 text-sm">
        <label className="flex items-center gap-2">
            <input
            type="checkbox"
            checked={filters.status.Completed}
            onChange={() => setFilters("status", "Completed")}
            className="accent-indigo-500"
            />
            Completed
        </label>

        <label className="flex items-center gap-2">
            <input
            type="checkbox"
            checked={filters.status.Pending}
            onChange={() => setFilters("status", "Pending")}
            className="accent-indigo-500"
            />
            Pending
        </label>

        <label className="flex items-center gap-2">
            <input
            type="checkbox"
            checked={filters.status["Under Development"]}
            onChange={() => setFilters("status", "Under Development")}
            className="accent-indigo-500"
            />
            Under Development
        </label>
        </div>

        {/* Date Filters */}
        <div className="mt-6 space-y-4 text-sm">
        <div>
            <label className="text-gray-300 text-xs block mb-1">Created From</label>
            <input
            type="date"
            value={filters.createdFrom}
            onChange={(e) => setFilters("createdFrom", e.target.value)}
            className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-gray-200 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
        </div>

        <div>
            <label className="text-gray-300 text-xs block mb-1">Created To</label>
            <input
            type="date"
            value={filters.createdTo}
            onChange={(e) => setFilters("createdTo", e.target.value)}
            className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-gray-200 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
        </div>

        <div>
            <label className="text-gray-300 text-xs block mb-1">Last Commit From</label>
            <input
            type="date"
            value={filters.lastFrom}
            onChange={(e) => setFilters("lastFrom", e.target.value)}
            className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-gray-200 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
        </div>

        <div>
            <label className="text-gray-300 text-xs block mb-1">Last Commit To</label>
            <input
            type="date"
            value={filters.lastTo}
            onChange={(e) => setFilters("lastTo", e.target.value)}
            className="w-full rounded-md bg-white/10 px-2 py-1 text-xs text-gray-200 border border-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
        </div>
        </div>

        {/* Apply Filters Button */}
        <button
        className="mt-6 w-full px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-md transition-all"
        >
        Apply Filters
        </button>
        <button
        onClick={() => {
            setFiltersState({
            status: { Completed: false, Pending: false, "Under Development": false },
            createdFrom: "",
            createdTo: "",
            lastFrom: "",
            lastTo: "",
            });
        }}
        className="mt-3 w-full px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 font-medium transition-all"
        >
        Clear Filters
        </button>

        {/* View Mode Switcher */}
        <div className="mt-10 border-t border-white/10 pt-5">
          <div className="flex items-center justify-between text-gray-300">
            <span className="text-sm font-medium">View Mode</span>
            <button
              onClick={() =>
                setViewMode(viewMode === "grid" ? "list" : "grid")
              }
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-all"
              title={
                viewMode === "grid"
                  ? "Switch to List View"
                  : "Switch to Grid View"
              }
            >
              {viewMode === "grid" ? <List size={18} /> : <LayoutGrid size={18} />}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
