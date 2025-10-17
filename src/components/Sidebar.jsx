import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-slate-900/50 backdrop-blur-sm border-r border-white/10 p-6 h-screen sticky top-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-purple-500/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <h2 className="text-xl font-semibold text-white">Filters</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="name">Name</option>
              <option value="createdAt">Created Date</option>
              <option value="lastCommit">Last Commit</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Sort Order</label>
            <select
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
              className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Status</label>
            <select
              value={filters.status || "all"}
              onChange={(e) => handleFilterChange("status", e.target.value === "all" ? "" : e.target.value)}
              className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="under-development">Under Development</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">Date Range</label>
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-400 mb-1">From</label>
                <input
                  type="datetime-local"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">To</label>
                <input
                  type="datetime-local"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilters({
              sortBy: "name",
              sortOrder: "asc",
              status: "all",
              dateFrom: "",
              dateTo: ""
            })}
            className="w-full py-2 px-4 bg-slate-800/80 hover:bg-slate-700/80 text-gray-300 rounded-lg transition-colors text-sm font-medium"
          >
            Reset Filters
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
