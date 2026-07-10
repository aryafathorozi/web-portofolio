"use client";

import { Toaster as SonnerToaster } from "sonner";

export function ToastProvider() {
  return (
    <SonnerToaster
      position="bottom-right"
      expand={false}
      richColors={false}
      toastOptions={{
        style: {
          background: "rgba(3, 7, 18, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          color: "#ffffff",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "12px",
          borderRadius: "12px",
          backdropFilter: "blur(8px)",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.7)",
        },
      }}
    />
  );
}
