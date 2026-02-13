import { useLocation } from "react-router-dom";
import { useState } from "react";
import { exportMarkdown } from "../utils/exportMarkdown";
import { toast } from "sonner";
import { editTaskApi, reorderTasksApi, groupTasksApi, deleteTaskApi } from "../api/specApi";
import EditorHeader from "../components/editor/EditorHeader";
import EpicCard from "../components/editor/EpicCard";
import EditorActions from "../components/editor/EditorActions";
import { useEffect } from "react";
import { getSpecByIdApi } from "../api/specApi";

export default function Editor() {
  const { state } = useLocation();
  const [spec, setSpec] = useState(state?.data);

  if (!spec) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No spec loaded.
      </div>
    );
  }

  function deleteTask(epicIndex, storyIndex, taskId) {
    const specId = spec._id;

    // Optimistic UI update
    setSpec((prev) => {
      const copy = structuredClone(prev);
      copy.output.epics[epicIndex].userStories[storyIndex].tasks =
        copy.output.epics[epicIndex].userStories[storyIndex].tasks.filter(
          (task) => task.id !== taskId,
        );
      return copy;
    });

    deleteTaskApi(specId, taskId)
      .then(() => toast.success("Task deleted"))
      .catch(() => toast.error("Failed to delete task"));
  }

  const reorderTasks = async (epicIndex, storyIndex, newTasks) => {
    try {
      const specId = spec._id;

      setSpec((prev) => {
        const copy = structuredClone(prev);
        copy.output.epics[epicIndex].userStories[storyIndex].tasks = newTasks;
        return copy;
      });

      const orderedTaskIds = newTasks.map((task) => task.id);

      await reorderTasksApi(specId, epicIndex, storyIndex, orderedTaskIds);

      toast.success("Tasks reordered");
    } catch (err) {
      toast.error("Failed to reorder tasks");
    }
  };

  const editTask = async (epicIndex, storyIndex, taskId, updates) => {
    try {
      const updatedSpec = structuredClone(spec);

      const tasks =
        updatedSpec.output.epics[epicIndex].userStories[storyIndex].tasks;

      const task = tasks.find((t) => t.id === taskId);

      if (!task) return;

      Object.assign(task, updates);

      setSpec(updatedSpec);

      await editTaskApi(spec._id, taskId, updates);

      toast.success("Task updated");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const groupTasks = async (epicIndex, storyIndex, groups) => {
    try {
      const specId = spec._id;

      await groupTasksApi(specId, epicIndex, storyIndex, groups);

      toast.success("Tasks grouped");

      // refetch fresh data
      const res = await getSpecByIdApi(specId);
      setSpec(res.data.data);
    } catch (err) {
      toast.error("Failed to group tasks");
    }
  };

  useEffect(() => {
    if (!spec?._id) return;

    const fetchSpec = async () => {
      const res = await getSpecByIdApi(spec._id);
      setSpec(res.data.data);
    };

    fetchSpec();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-indigo-300/30 blur-3xl rounded-full -top-40 -left-40" />
        <div className="absolute w-[700px] h-[700px] bg-purple-300/30 blur-3xl rounded-full bottom-0 right-0" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-10">
        <EditorHeader spec={spec} />

        {spec.output.epics.map((epic, epicIndex) => (
          <EpicCard
            key={epicIndex}
            epic={epic}
            epicIndex={epicIndex}
            deleteTask={deleteTask}
            reorderTasks={reorderTasks}
            editTask={editTask}
          />
        ))}

        <EditorActions spec={spec} />
      </div>
    </div>
  );
}
