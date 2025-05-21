import React from "react";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
};

export const Deletemodal: React.FC<ConfirmModalProps> = ({ open, onClose, onConfirm, message }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? "visible bg-black/10" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-lg shadow p-6 transition-all max-w-sm w-full ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-center mb-4">{message}</h2>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Oui
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
};
