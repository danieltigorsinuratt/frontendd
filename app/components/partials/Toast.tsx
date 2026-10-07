"use client";

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className="alert-success">
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="alert-close-btn"
          aria-label="Tutup notifikasi"
        >
          &times;
        </button>
      )}
    </div>
  );
}
