import { IconTarget, IconUsers, IconLayout } from "@tabler/icons-react";

export default function EditorHeader({ spec }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl transition hover:shadow-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {spec.goal}
      </h1>

      <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <IconUsers size={18} />
          <span><strong>Users:</strong> {spec.users}</span>
        </div>

        <div className="flex items-center gap-2">
          <IconLayout size={18} />
          <span><strong>Template:</strong> {spec.templateType}</span>
        </div>

        <div className="flex items-center gap-2">
          <IconTarget size={18} />
          <span><strong>Constraints:</strong> {spec.constraints}</span>
        </div>

      </div>
    </div>
  );
}
