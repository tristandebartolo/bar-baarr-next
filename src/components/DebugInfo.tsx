"use client";

import { useEffect } from "react";

type DebugInfoProps = {
  data: any;
  label: string;
};

export default function DebugInfo({ data, label }: DebugInfoProps) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEBUG === "true") {
      console.log(`[CLIENT DEBUG] ${label}:`, data);
    }
  }, [data, label]);

  if (process.env.NEXT_PUBLIC_DEBUG !== "true") {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        background: "rgba(0,0,0,0.9)",
        color: "#0f0",
        padding: "10px",
        borderRadius: "5px",
        maxWidth: "400px",
        maxHeight: "300px",
        overflow: "auto",
        zIndex: 9999,
        fontSize: "12px",
        fontFamily: "monospace",
      }}
    >
      <strong>{label}</strong>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
