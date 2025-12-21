// src/lib/toastContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "error" | "warning" | "info";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  addToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType = "info") => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove après 5 secondes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Le conteneur de toasts en bas à droite */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              flex items-center gap-3 rounded-lg px-5 py-4 text-black shadow-lg
              min-w-80 max-w-md animate-in slide-in-from-bottom duration-300
              ${toast.type === "success" ? "bg-green-300" : ""}
              ${toast.type === "error" ? "bg-red-300" : ""}
              ${toast.type === "warning" ? "bg-yellow-300" : ""}
              ${toast.type === "info" ? "bg-blue-300" : ""}
            `}
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          >
            {/* Icônes simples avec SVG ou Lucide si tu l'as déjà */}
            {toast.type === "success" && "✓"}
            {toast.type === "error" && "✕"}
            {toast.type === "warning" && "⚠"}
            {toast.type === "info" && "ℹ"}

            <p className="font-medium">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}