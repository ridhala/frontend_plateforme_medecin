import React from "react";

type PropsType = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
};

export const ConfirmationModal: React.FC<PropsType> = ({ 
  open, 
  onClose, 
  onConfirm,
  children 
}) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors z-50 ${
        open ? "visible bg-black/20" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white rounded-lg shadow p-6 transition-all max-w-md w-full ${
          open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        
        <div className="mt-4 mb-6">
          {children || <p className="text-gray-700">Confirmez-vous la création de ce rendez-vous ?</p>}
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 border border-transparent  rounded-md text-white bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};