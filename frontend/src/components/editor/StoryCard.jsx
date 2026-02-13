import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import TaskItem from "./TaskItem";
import { IconBook } from "@tabler/icons-react";

export default function StoryCard({
  story,
  epicIndex,
  storyIndex,
  deleteTask,
  reorderTasks,
  editTask,
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = validTasks.findIndex((t) => t.id === active.id);
    const newIndex = validTasks.findIndex((t) => t.id === over.id);

    const newTasks = arrayMove(validTasks, oldIndex, newIndex);

    reorderTasks(epicIndex, storyIndex, newTasks);
  }

  const validTasks = Array.isArray(story?.tasks)
    ? story.tasks.filter((task) => task && task.id)
    : [];

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 border rounded-2xl p-6 space-y-5">
      <div className="flex items-start gap-2">
        <IconBook size={18} className="text-purple-500 mt-1" />
        <div>
          <h3 className="font-semibold text-gray-800">{story.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{story.description}</p>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={validTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {validTasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                task={task}
                onDelete={() => deleteTask(epicIndex, storyIndex, task.id)}
                onEdit={(updates) =>
                  editTask(epicIndex, storyIndex, task.id, updates)
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
