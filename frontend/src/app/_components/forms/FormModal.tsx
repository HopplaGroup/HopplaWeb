"use client";
import { X, Save } from "lucide-react";
import { FormEvent, ReactNode } from "react";

interface FormModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  loading: boolean;
  firstError?: { message: string } | null;
}

export default function FormModal({
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  loading,
  firstError,
}: FormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-auto max-h-[90vh] flex flex-col animate-fade-in">
        <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-4">
            {children}

            {firstError && (
              <div className="text-red-500 text-sm">{firstError.message}</div>
            )}
          </div>

          <div className="flex justify-end space-x-3 p-6 pt-4 border-t border-gray-100 flex-shrink-0">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 flex items-center gap-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
