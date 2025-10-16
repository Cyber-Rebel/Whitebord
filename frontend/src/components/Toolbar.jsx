import React from "react";

const Toolbar = ({ eraseMode, onToggleEraseMode }) => {
  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={onToggleEraseMode}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {eraseMode ? "Switch to Draw" : "Switch to Eraser"}
      </button>
    </div>
  );
};

export default Toolbar;