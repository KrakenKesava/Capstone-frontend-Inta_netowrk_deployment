import React, { useEffect, useState, useMemo } from "react"; // ✅ added useMemo
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button.jsx";
import NavbarDashboard from "../components/NavbarDashboard.jsx";
import { mockCommits as initialMock } from "../data/mockCommits.js";
import { ChevronDown, ChevronUp, Power, Play, Plus } from "lucide-react";

export default function ProjectCommitPage({ username = "Kesava" }) {
  const { projectName } = useParams();
  const decodedName = decodeURIComponent(projectName || "");

  const [commits, setCommits] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // ✅ search state for NavbarDashboard

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = initialMock[decodedName] || [];
      setCommits([...data].reverse());
      setLoading(false);
    }, 400);
  }, [decodedName]);

  // ✅ Filter commits based on search input
  const filteredCommits = useMemo(() => {
    if (!search.trim()) return commits;
    const query = search.toLowerCase();
    return commits.filter(
      (c) =>
        c.id.toLowerCase().includes(query) ||
        c.member.toLowerCase().includes(query) ||
        c.ip?.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query)
    );
  }, [search, commits]);

  const toggleRow = (id) => setExpandedRow(expandedRow === id ? null : id);
  const runningCount = commits.filter((c) => c.isRunning).length;

  const toggleMachine = (id) => {
    setCommits((prev) =>
      prev.map((commit) => {
        if (commit.id !== id) return commit;
        if (commit.isRunning) {
          return { ...commit, isRunning: false, ip: "", timeRemaining: "" };
        }
        if (runningCount >= 3) {
          alert("⚠️ You can only run 3 machines at a time.");
          return commit;
        }
        const ip = window.prompt("Enter IP:Port for this commit:");
        if (!ip) return commit;
        const timeRemaining = window.prompt("Enter Time Remaining (e.g., 2h 15m):");
        if (!timeRemaining) return commit;
        return { ...commit, ip, timeRemaining, isRunning: true };
      })
    );
  };

  const handleAddCommit = () => {
    const commitId = window.prompt("Paste the GitHub Commit ID:");
    if (!commitId) return;
    const description =
      window.prompt("Enter commit description:") || "No description provided.";
    const newCommit = {
      id: commitId,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      member: username,
      description,
      isRunning: false,
      ip: "",
      timeRemaining: "",
    };
    setCommits((prev) => [newCommit, ...prev]);
  };

  const getOrdinal = (index) => {
    const n = index + 1;
    if (n % 10 === 1 && n % 100 !== 11) return `${n}st Commit`;
    if (n % 10 === 2 && n % 100 !== 12) return `${n}nd Commit`;
    if (n % 10 === 3 && n % 100 !== 13) return `${n}rd Commit`;
    return `${n}th Commit`;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-[#060814] text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-12 h-12 border-4 border-gray-700 border-t-indigo-500 rounded-full shadow-lg"
        />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05060F] via-[#0A0D1F] to-[#101327] text-gray-100 overflow-x-hidden">
      {/* ✅ Pass search state to NavbarDashboard */}
      <NavbarDashboard search={search} setSearch={setSearch} username={username} />

      <div className="pt-[5rem] px-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/[0.06] border border-white/[0.08] backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-purple-600/5 opacity-70 pointer-events-none" />
          <h2 className="text-2xl font-semibold text-white mb-1 tracking-wide">
            {decodedName}
          </h2>
          <p className="text-gray-300 text-sm">
            Description:{" "}
            <span className="text-gray-400">Internal development project</span>
          </p>
          <p className="text-gray-400 text-sm mt-1">
            No. of Members: {new Set(commits.map((c) => c.member)).size}
          </p>

          {/* Floating Add Commit button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="absolute right-6 bottom-6"
          >
            <Button
              onClick={handleAddCommit}
              color="indigo"
              className="flex items-center gap-2 px-5 py-2 text-sm rounded-xl shadow-md bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/40 transition-all"
            >
              <Plus size={16} /> Add Commit
            </Button>
          </motion.div>
        </motion.div>

        {/* Table Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-7 gap-4 font-semibold text-gray-300 border-b border-white/10 pb-3 mb-2"
        >
          <span>#</span>
          <span>IP:Port</span>
          <span>Commit ID</span>
          <span>Date & Time</span>
          <span>Member</span>
          <span>Time Remaining</span>
          <span className="text-right">Action</span>
        </motion.div>

        {/* ✅ Use filteredCommits instead of commits */}
        <AnimatePresence>
          {filteredCommits.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              No matching commits found.
            </p>
          ) : (
            filteredCommits.map((commit, index) => (
              <motion.div
                key={commit.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className={`border border-white/[0.07] rounded-xl mt-3 backdrop-blur-sm bg-white/[0.03] shadow-inner hover:bg-white/[0.06] transition-all duration-300 overflow-hidden ${
                  expandedRow === commit.id
                    ? "ring-1 ring-indigo-500/50 scale-[1.01]"
                    : ""
                }`}
              >
                {/* Summary Row */}
                <div
                  className="grid grid-cols-7 items-center p-3 cursor-pointer transition-all duration-300"
                  onClick={() => toggleRow(commit.id)}
                >
                  <span className="text-gray-400 font-semibold">
                    {getOrdinal(index)}
                  </span>
                  <span className="truncate text-gray-200">
                    {commit.isRunning ? commit.ip : "-"}
                  </span>
                  <span className="text-gray-200 font-mono truncate">
                    {commit.id}
                  </span>
                  <span className="text-gray-300">{commit.date}</span>
                  <span className="text-gray-200">{commit.member}</span>
                  <span className="text-gray-200">
                    {commit.isRunning ? commit.timeRemaining : "-"}
                  </span>
                  <div className="flex justify-end">
                    {expandedRow === commit.id ? (
                      <ChevronUp className="text-indigo-400" />
                    ) : (
                      <ChevronDown className="text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded View */}
                <AnimatePresence>
                  {expandedRow === commit.id && (
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="p-5 border-t border-white/10 bg-white/[0.04] text-sm rounded-b-xl"
                    >
                      <p className="text-gray-300 italic mb-4">
                        {commit.description}
                      </p>

                      {commit.isRunning && (
                        <div className="bg-white/[0.06] rounded-md p-3 mb-3 border border-white/10 shadow-inner">
                          <p className="text-gray-300 text-sm">
                            <strong>IP:Port:</strong> {commit.ip}
                          </p>
                          <p className="text-gray-300 text-sm">
                            <strong>Time Remaining:</strong> {commit.timeRemaining}
                          </p>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMachine(commit.id);
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-md text-white transition shadow-lg ${
                            commit.isRunning
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {commit.isRunning ? (
                            <>
                              <Power size={16} /> Stop Machine
                            </>
                          ) : (
                            <>
                              <Play size={16} /> Launch Machine
                            </>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
