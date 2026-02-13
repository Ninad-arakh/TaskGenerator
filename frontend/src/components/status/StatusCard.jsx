import { IconCheck } from "@tabler/icons-react";

export default function StatusCard({ title, icon, status }) {
  const isUp = status;

  return (
    <div className="group relative bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">

      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/0 group-hover:to-purple-400/10 transition-all duration-300" />

      <div className="relative flex flex-col items-center text-center space-y-6">

        <div className="text-blue-500 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        <h3 className="text-2xl font-semibold text-gray-800">
          {title}
        </h3>

        <div className={`flex items-center gap-2  font-medium ${ isUp ? "text-green-600" : "text-red-500"}`}>
          {isUp && (
            <IconCheck size={20} className="bg-green-100 p-1 rounded-full" />
          )}
          <span>{isUp ? "Operational" : "Down"}</span>
        </div>
      </div>
    </div>
  );
}
