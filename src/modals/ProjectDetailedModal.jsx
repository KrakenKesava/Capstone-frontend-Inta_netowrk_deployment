/*
File: src/components/modals/ProjectDetailsModal.jsx
*/
import React from 'react';

export default function ProjectDetailsModal({ open, project, onClose, onOpenFull }) {
  if (!open || !project) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">{project.name}</h3>
            <div className="text-sm text-gray-500">{project.status} • last commit {project.lastCommit}</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded" onClick={() => onOpenFull(project.id)}>Open full page</button>
            <button className="px-3 py-1 border rounded" onClick={onClose}>Close</button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-700 dark:text-gray-200">
          <div className="font-medium">Description</div>
          <p className="mt-2">{project.description}</p>

          <div className="mt-4 font-medium">Metadata</div>
          <ul className="mt-2 text-xs space-y-1 text-gray-500">
            <li>Created: {new Date(project.createdAt).toDateString()}</li>
            <li>Last commit: {project.lastCommit}</li>
            <li>Status: {project.status}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

