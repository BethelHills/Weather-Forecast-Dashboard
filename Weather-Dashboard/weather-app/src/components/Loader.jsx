import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-white/30 border-t-white"></div>
    </div>
  );
}
