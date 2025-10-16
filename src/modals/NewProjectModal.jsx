
/*
File: src/components/modals/NewProjectModal.jsx
*/
import React from 'react';

export default function NewProjectModal({ open, onClose, onCreate }) {
  const [form, setForm] = React.useState({ name: '', repo: '', commit: '', description: '', status: 'Pending' });
  React.useEffect(() => { if (!open) setForm({ name: '', repo: '', commit: '', description: '', status: 'Pending' }); }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Create New Project</h3>
        <form onSubmit={(e) => { e.preventDefault(); onCreate(form); }} className="space-y-3">
          <div>
            <label className="text-sm">Project name</label>
            <input value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="text-sm">Repo link</label>
            <input value={form.repo} onChange={(e) => setForm((s) => ({ ...s, repo: e.target.value }))} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="text-sm">Commit ID (optional)</label>
            <input value={form.commit} onChange={(e) => setForm((s) => ({ ...s, commit: e.target.value }))} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="text-sm">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))} className="w-full mt-1 px-3 py-2 border rounded" />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button type="button" className="px-4 py-2" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

