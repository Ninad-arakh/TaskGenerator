import { IconRefresh } from "@tabler/icons-react";

export default function RefreshButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <IconRefresh
        size={18}
        className={loading ? "animate-spin" : ""}
      />
      {loading ? "Refreshing..." : "Refresh Status"}
    </button>
  );
}
