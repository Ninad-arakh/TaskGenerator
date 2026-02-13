import { IconCalendar, IconRocket } from "@tabler/icons-react";
import HistoryStats from "./HistoryStats";

export default function HistoryCard({ item, onOpen }) {

  const totalEpics = item.output?.epics?.length || 0;

  const totalStories =
    item.output?.epics?.reduce(
      (acc, epic) => acc + epic.userStories.length,
      0,
    ) || 0;

  const totalTasks =
    item.output?.epics?.reduce(
      (acc, epic) =>
        acc +
        epic.userStories.reduce(
          (storyAcc, story) => storyAcc + story.tasks.length,
          0,
        ),
      0,
    ) || 0;

  return (
    <div className="group bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-md transition hover:shadow-2xl hover:-translate-y-2 duration-300">

      {/* Goal */}
      <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
        {item.goal}
      </h2>

      {/* Meta */}
      <div className="text-sm text-gray-500 mt-4 space-y-1">
        <div><strong>Users:</strong> {item.users || "N/A"}</div>
        <div><strong>Template:</strong> {item.templateType || "N/A"}</div>
      </div>

      {/* Stats */}
      <HistoryStats
        epics={totalEpics}
        stories={totalStories}
        tasks={totalTasks}
      />

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <IconCalendar size={14} />
          {new Date(item.createdAt).toLocaleDateString()}
        </div>

        <button
          onClick={onOpen}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm shadow-md transition hover:scale-105 hover:shadow-xl"
        >
          <IconRocket size={16} />
          Open
        </button>

      </div>
    </div>
  );
}
