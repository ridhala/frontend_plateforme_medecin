import React from "react";

type PropsType = {
  open: boolean;
  onclose: () => void;
  children: React.ReactNode;
};

export const UpdateModal: React.FC<PropsType> = ({ open, onclose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? "visible bg-black/20" : "invisible"
      }`}
      onClick={onclose}
    >
      <div
        className={`relative bg-white rounded-lg shadow p-6 transition-all max-w-md w-full ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          onClick={onclose}
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
};
