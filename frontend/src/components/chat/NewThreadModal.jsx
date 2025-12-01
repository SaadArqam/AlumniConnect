import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewThreadModal({ isOpen, onClose, onCreateThread }) {
  const [title, setTitle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreateThread(title.trim());
      setTitle('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-slate-200 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Thread</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter thread title..."
            className="w-full p-3 mb-4 bg-slate-50 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            required
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-sm font-medium shadow-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

NewThreadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreateThread: PropTypes.func.isRequired,
};
