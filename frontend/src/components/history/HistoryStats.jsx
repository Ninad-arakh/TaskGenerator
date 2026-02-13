export default function HistoryStats({ epics, stories, tasks }) {
  return (
    <div className="flex gap-4 mt-6 text-xs">

      <div className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
        {epics} Epics
      </div>

      <div className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
        {stories} Stories
      </div>

      <div className="px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
        {tasks} Tasks
      </div>

    </div>
  );
}
