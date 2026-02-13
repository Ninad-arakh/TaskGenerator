import StoryCard from "./StoryCard";

export default function EpicCard({
  epic,
  epicIndex,
  deleteTask,
  reorderTasks,
  editTask
}) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg space-y-8 transition hover:shadow-2xl">

      <div className="flex items-start gap-3">
        {/* <IconLayers size={24} className="text-indigo-500" /> */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {epic.title}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {epic.description}
          </p>
        </div>
      </div>

      {epic.userStories.map((story, storyIndex) => (
        <StoryCard
          key={storyIndex}
          story={story}
          epicIndex={epicIndex}
          storyIndex={storyIndex}
          deleteTask={deleteTask}
          reorderTasks={reorderTasks}
          editTask={editTask}
        />
      ))}
    </div>
  );
}
