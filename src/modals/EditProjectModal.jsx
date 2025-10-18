/*
File: src/components/modals/EditProjectModal.jsx
*/
import React from 'react';


export default function EditProjectModal({ open, project, onClose, onSave }) {
  const [local, setLocal] = React.useState({ name: '', status: 'Pending', lastCommit: '', description: '' });
  React.useEffect(() => {
    if (project) {
      setLocal({
        name: project.name || '',
        status: project.status || 'Pending',
        lastCommit: project.lastCommit || '',
        description: project.description || '',
      });
    }
  }, [project]);
  if (!open || !project) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Edit Project</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm">Name</label>
            <input value={local.name} onChange={(e) => setLocal((s) => ({ ...s, name: e.target.value }))} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="text-sm">Status</label>
            <select value={local.status} onChange={(e) => setLocal((s) => ({ ...s, status: e.target.value }))} className="w-full mt-1 px-3 py-2 border rounded">
              <option>Pending</option>
              <option>Under Development</option>
              <option>Completed</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Last Commit Date</label>
            <input type="date" value={local.lastCommit} onChange={(e) => setLocal((s) => ({ ...s, lastCommit: e.target.value }))} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="text-sm">Description</label>
            <textarea value={local.description} onChange={(e) => setLocal((s) => ({ ...s, description: e.target.value }))} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button className="px-3 py-1" onClick={onClose}>Cancel</button>
            <button className="px-3 py-1 bg-black text-white rounded" onClick={() => onSave(project.id, local)}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
