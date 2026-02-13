import { IconHistory } from "@tabler/icons-react";

export default function HistoryHeader() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg">

      <div className="flex items-center gap-3">
        <IconHistory size={26} className="text-indigo-600" />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Specification History
        </h1>
      </div>

      <p className="text-gray-500 mt-3 text-sm">
        Review and reopen your previously generated AI specifications.
      </p>
    </div>
  );
}
