import { IconDatabaseOff } from "@tabler/icons-react";

export default function HistoryEmpty() {
  return (
    <div className="bg-white/60 backdrop-blur-xl border rounded-3xl p-12 text-center shadow-md">
      <IconDatabaseOff size={40} className="mx-auto text-gray-400" />
      <h3 className="text-lg font-semibold mt-4">
        No history yet
      </h3>
      <p className="text-gray-500 mt-2 text-sm">
        Generate your first specification to see it here.
      </p>
    </div>
  );
}
