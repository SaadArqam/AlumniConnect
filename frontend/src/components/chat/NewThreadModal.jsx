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
      onClose(); // Close modal after creating thread
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800/30 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-gray-700 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Create New Thread</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter thread title..."
            className="w-full p-3 mb-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            required
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-700/50 text-gray-200 rounded-full hover:bg-gray-600/50 transition duration-200 ease-in-out shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 ease-in-out shadow-md"
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
